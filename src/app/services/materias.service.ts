import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Materia } from '../models/materia.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/materias/';

@Injectable({providedIn: 'root'})
export class MateriasService {
  private materias: Materia[] = [];
  private materiasAtualizadas = new Subject<Materia[]>();

  constructor(private http: HttpClient, private router: Router) {}

  novaMateria(nome: string, codMateria: string, descricao: string, linkImg: string, nomeProf: string, diasSemana: string){
    console.log(nome +' '+ codMateria +' '+ descricao +' '+ linkImg +' '+ nomeProf +' '+ diasSemana);

    const dadosMateria = {
      nome: nome,
      codMateria: codMateria,
      descricao: descricao,
      linkImg: linkImg,
      diasSemana: diasSemana,
      nomeProf: nomeProf
    };

    return this.http.post<{msg: string, materia: Materia}>(BACKEND_URL, dadosMateria);
  }
 
  buscarMaterias(listaMaterias: string[]) {
    this.http.get<{ msg: string, materias: Materia[] }>(BACKEND_URL,
      { headers: { 'materias': JSON.stringify(listaMaterias) } }).subscribe(res => {
        this.materias = res.materias;
        this.materiasAtualizadas.next([...this.materias]);
        
    });
  }

  getMaterias() {
    return this.materiasAtualizadas.asObservable();
  }

  buscarMateria(idMateria: string) {
    this.http.get<{ msg: string, materia: Materia }>(BACKEND_URL + '?id=' + idMateria).subscribe(res => {
      console.log(res)
    })
  }

}
