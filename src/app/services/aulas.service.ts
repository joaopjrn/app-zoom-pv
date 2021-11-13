import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Aula } from "../models/aula.model";

const BACKEND_URL = environment.apiUrl + "/aula/";
@Injectable({ providedIn: 'root' })
export class AulasService {
  listaAulas: Aula[] = [];
  aulasOrganizadas = [([] as Aula[]), ([] as Aula[])];

  subAulasCarregadas = new Subject<boolean>();
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  novaAula(nome: string, idMateria: string, conteudo: string, data: string) {
    const aula = {
      nome: nome,
      idMateria: idMateria,
      conteudo: conteudo,
      data: data,
    }
    this.http.post<{ msg: string, aula: Aula }>(BACKEND_URL, aula).subscribe(res => {
      // console.log('aula antes do push:');
      // console.log(res.aula);
      this.listaAulas.push(res.aula);
      this.organizarAulas();
      this.subAulasCarregadas.next(true);
      this.mostrarNotificacao(res.msg, 'sucesso');
    });
  }

  buscarAulas(idMateria: string) {
    this.http.get<{ msg: string, aulas: any }>(BACKEND_URL + idMateria).subscribe(res => {
      this.listaAulas = res.aulas;
      this.organizarAulas();
      this.subAulasCarregadas.next(true);
    });
  }

  excluirAula(id: string) {
    this.http.delete<{ msg: string, excluido: boolean }>(BACKEND_URL + id).subscribe(res => {
      if (res.excluido) {
        this.aulasOrganizadas[0] = this.aulasOrganizadas[0].filter(aula => aula._id !== id);
        this.aulasOrganizadas[1] = this.aulasOrganizadas[1].filter(aula => aula._id !== id);

        this.subAulasCarregadas.next(true);
        this.mostrarNotificacao(res.msg, 'sucesso');
      }
    })
  }

  alterarAula(aulaAtualizada: Aula) {
    this.http.put<{ msg: string, aulaAlterada: any }>(BACKEND_URL, { data: aulaAtualizada.data.toISOString(), ...aulaAtualizada })
      .subscribe(res => {
        let iLista: number, iAula: number;
        this.aulasOrganizadas.some((lista, index) => {
          iLista = index;
          return lista.some((aula, i) => {
            iAula = i;
            return aula._id === aulaAtualizada._id;
          })
        });
        this.aulasOrganizadas[iLista][iAula] = aulaAtualizada;
        this.subAulasCarregadas.next(true);
        this.mostrarNotificacao(res.msg, 'sucesso');
      })
  }


  organizarAulas() {
    this.aulasOrganizadas[0] = [];
    this.aulasOrganizadas[1] = [];
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // console.log(hoje);

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
    // console.dir(this.aulasOrganizadas);
  }

  mostrarNotificacao(msg: string, tipo: string){
    this.snackbar.openFromComponent(ErroComponent, {data: {msg: msg, tipo: tipo}, duration: 2000})
  }

  getSubAulasCarregadas() {
    return this.subAulasCarregadas.asObservable();
  }

  getAulas() {
    return [...this.aulasOrganizadas];
  }
}
