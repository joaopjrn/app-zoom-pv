import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Materia } from '../models/materia.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';
import { ErroComponent } from '../componentes/snackbars/erro/erro.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = environment.apiUrl + '/materia/';

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private materias: Materia[] = [];
  private subMateriasCarregadas = new Subject<boolean>();
  private materiaAtiva: Materia;

  constructor(private http: HttpClient, private router: Router, private usuarioSvc: UsuarioService, private snackbar: MatSnackBar) { }

  novaMateria(nome: string, codMateria: string, descricao: string, linkImg: string, hue: number, nomeProf: string, diasSemana: string) {

    const dadosMateria = {
      nome: nome,
      codMateria: codMateria,
      descricao: descricao,
      linkImg: linkImg,
      hue: hue,
      diasSemana: diasSemana,
      nomeProf: nomeProf
    };

    this.http.post<{ msg: string, materia: Materia }>(BACKEND_URL, dadosMateria).subscribe(materiaInserida => {
      console.log(materiaInserida.materia);
      let usuario: Usuario = this.usuarioSvc.getUsuarioLogado();
      usuario.materias.push(materiaInserida.materia._id);
      this.usuarioSvc.entrarTurma(materiaInserida.materia._id, usuario._id).subscribe(res => {
        if (res.atualizado) {
          this.inserirMateriaLocal(materiaInserida.materia);
          this.mostrarNotificacao(materiaInserida.msg, 'sucesso');
        }
      });
    });

  }

  buscarMaterias(listaMaterias: string[]) {
    this.http.get<{ msg: string, materias: Materia[] }>(BACKEND_URL,
      { headers: { 'materias': JSON.stringify(listaMaterias)} }).subscribe(res => {
        console.log('matérias carregadas')
        this.materias = res.materias;
        this.subMateriasCarregadas.next(true);
      });
  }

  buscarMateria(codMateria: string) {
    return this.http.get<{ msg: string, materiaEncontrada: Materia }>(BACKEND_URL + codMateria);
  }

  excluirMateria(id: string){
    this.http.delete<{msg: string, excluido: boolean}>(BACKEND_URL + id).subscribe(res => {
      if(res.excluido){
        this.materias = this.materias.filter(materia => materia._id !== id);
        this.subMateriasCarregadas.next(true);
        this.mostrarNotificacao(res.msg, 'sucesso');
      }
    })
  }

  alterarMateria(id: string, nome: string, codMateria: string, descricao: string, linkImg: string, hue: number, nomeProf: string, diasSemana: string){
    const dadosMateria = {
      materia: JSON.stringify({
        _id: id,
        nome: nome,
        codMateria: codMateria,
        descricao: descricao,
        linkImg: linkImg,
        hue: hue,
        diasSemana: diasSemana,
        nomeProf: nomeProf
      })
    }

    this.http.put<{msg: string, dados: any}>(BACKEND_URL+id, dadosMateria).subscribe(res => {
      if(res.dados.modifiedCount > 0){
        const materiaAtualizada = JSON.parse(dadosMateria.materia);
        this.materias.forEach((materia, i) => {
          if(materia._id === id){
            this.materias[i] = materiaAtualizada
          }
        });
        this.mostrarNotificacao(res.msg, 'sucesso');
        this.subMateriasCarregadas.next(true);
      }
    })
  }

  inserirMateriaLocal(materia: Materia) {
    this.materias.push(materia);
    this.subMateriasCarregadas.next(true);
  }

  mostrarNotificacao(msg: string, tipo: string){
    this.snackbar.openFromComponent(ErroComponent, {data: {msg: msg, tipo: tipo}, duration: 2000})
  }

  setMateriaAtiva(materia: Materia){
    this.materiaAtiva = materia;
  }

  getMateriaAtiva(){
    return {...this.materiaAtiva};
  }

  getSubMateriasCarregadas() {
    return this.subMateriasCarregadas.asObservable();
  }

  getMaterias() {
    return [...this.materias];
  }

}
