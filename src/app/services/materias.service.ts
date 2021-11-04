import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Materia } from '../models/materia.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/materia/';

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private materias: Materia[] = [];
  private materiasAtualizadas = new Subject<Materia[]>();

  constructor(private http: HttpClient, private router: Router) { }

  novaMateria(nome: string, codMateria: string, descricao: string, linkImg: string, nomeProf: string, diasSemana: string) {

    const dadosMateria = {
      nome: nome,
      codMateria: codMateria,
      descricao: descricao,
      linkImg: linkImg,
      diasSemana: diasSemana,
      nomeProf: nomeProf
    };

    return this.http.post<{ msg: string, materia: Materia }>(BACKEND_URL, dadosMateria);
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
