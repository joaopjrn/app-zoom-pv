import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Aula } from "../models/aula.model";

const BACKEND_URL = environment.apiUrl + "/aula/";
@Injectable({ providedIn: 'root' })
export class AulasService {
  listaAulas: Aula[] = [];
  aulasOrganizadas = [([] as Aula[]), ([] as Aula[])];

  subAulasCarregadas = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  novaAula(nome: string, idMateria: string, conteudo: string, data: string) {
    const aula = {
      nome: nome,
      idMateria: idMateria,
      conteudo: conteudo,
      data: data,
    }
    this.http.post<{ msg: string, aula: Aula }>(BACKEND_URL, aula).subscribe(res => {
      console.log('aula antes do push:');
      console.log(res.aula);
      this.listaAulas.push(res.aula);
      this.organizarAulas();
      this.subAulasCarregadas.next(true);
    });
  }

  buscarAulas(idMateria: string) {
    this.http.get<{ msg: string, aulas: any }>(BACKEND_URL + idMateria).subscribe(res => {
      this.listaAulas = res.aulas;
      this.organizarAulas();
      this.subAulasCarregadas.next(true);
    });
  }

  organizarAulas() {
    this.aulasOrganizadas[0] = [];
    this.aulasOrganizadas[1] = [];
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    console.log(hoje);

    this.listaAulas.forEach((aula: Aula) => {

      aula.data = new Date(aula.data);
      if (aula.data >= hoje) {
        this.aulasOrganizadas[0].push(aula);
      } else {
        this.aulasOrganizadas[1].push(aula);
      }
    });
    this.aulasOrganizadas[0].sort((a, b) => a.data.getTime() - b.data.getTime());
    this.aulasOrganizadas[1].sort((a, b) => b.data.getTime() - a.data.getTime());
    console.dir(this.aulasOrganizadas);
  }

  getSubAulasCarregadas() {
    return this.subAulasCarregadas.asObservable();
  }

  getAulas() {
    return [...this.aulasOrganizadas];
  }
}
