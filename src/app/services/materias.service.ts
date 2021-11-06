import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Materia } from '../models/materia.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';

const BACKEND_URL = environment.apiUrl + '/materia/';

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private materias: Materia[] = [];
  private materiasAtualizadas = new Subject<Materia[]>();

  constructor(private http: HttpClient, private router: Router, private usuarioSvc: UsuarioService) { }

  novaMateria(nome: string, codMateria: string, descricao: string, linkImg: string, nomeProf: string, diasSemana: string) {

    const dadosMateria = {
      nome: nome,
      codMateria: codMateria,
      descricao: descricao,
      linkImg: linkImg,
      diasSemana: diasSemana,
      nomeProf: nomeProf
    };

    this.http.post<{ msg: string, materia: Materia }>(BACKEND_URL, dadosMateria).subscribe(materiaInserida => {
      console.log(materiaInserida.materia);
      let usuario: Usuario = this.usuarioSvc.getUsuarioLogado();
      usuario.materias.push(materiaInserida.materia._id);
      this.usuarioSvc.atualizarUsuario(usuario).subscribe(res => {
        console.log(res);
      });
    });
  
  }

  buscarMaterias(listaMaterias: string) {
    this.http.get<{ msg: string, materias: Materia[] }>(BACKEND_URL,
      { headers:
        { 'materias': listaMaterias }
      }).subscribe(res => {
        this.materias = res.materias;
        this.materiasAtualizadas.next([...this.materias]);
      });
  }

  buscarMateria(codMateria: string) {
    return this.http.get<{ msg: string, materiaEncontrada: Materia }>(BACKEND_URL + codMateria);
  }

  getMateriasObs() {
    return this.materiasAtualizadas.asObservable();
  }

}
