import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Aula } from "../models/aula.model";

const BACKEND_URL = environment.apiUrl + "/aula/";
const ZOOM_URL = environment.apiUrl + "/zoom/";
@Injectable({ providedIn: 'root' })
export class AulasService {
  listaAulas: Aula[] = [];
  aulasOrganizadas = [([] as Aula[]), ([] as Aula[])];

  private subLinkGravacao = new Subject<string>();
  private subMudouAba = new Subject<number>();
  private subAulasCarregadas = new Subject<boolean>();
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  novaAula(nome: string, idMateria: string, conteudo: string, data: string, email: string, gravarAuto: boolean) {
    this.http.post<{msg: string, dados: any}>(ZOOM_URL,{topic: nome, email: email, agenda: conteudo, gravarAuto: gravarAuto}).subscribe(res => {
      console.log(res);
      const aula = {
        nome: nome,
        idMateria: idMateria,
        conteudo: conteudo,
        data: data,
        linkZoomProf: res.dados.start_url,
        linkZoomAluno: res.dados.join_url,
        idMeeting: res.dados.id
      }
      this.http.post<{ msg: string, aula: Aula }>(BACKEND_URL, aula).subscribe(res => {
        // console.log('aula antes do push:');
        console.log(res.aula);
        this.listaAulas.push(res.aula);
        this.organizarAulas();
        this.subAulasCarregadas.next(true);
        this.mostrarNotificacao(res.msg, 'sucesso');
      });
    })
  }

  buscarAulas(idMateria: string, tipoUsuario: number) {
    this.http.get<{ msg: string, aulas: any }>(BACKEND_URL + tipoUsuario +"/" + idMateria).subscribe(res => {
      this.listaAulas = res.aulas;
      this.organizarAulas();
      this.subAulasCarregadas.next(true);
    });
  }

  excluirAula(id: string) {
    this.http.delete<{ msg: string, excluido: boolean }>(BACKEND_URL + id).subscribe(res => {
      if (res.excluido) {
        this.listaAulas = this.listaAulas.filter(aula => aula._id !== id);
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

  buscarLinkGravacao(idMeeting: string){
    return this.http.get<{msg: string, dados: {link: string, senha: string}}>(ZOOM_URL+'gravacao/'+idMeeting);
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

  mudarAba(indexAba: number){
    this.subMudouAba.next(indexAba);
  }

  getSubLinkGravacao(){
    return this.subLinkGravacao.asObservable();
  }

  getSubAulasCarregadas() {
    return this.subAulasCarregadas.asObservable();
  }

  getSubMudouAba(){
    return this.subMudouAba.asObservable();
  }

  getAulas() {
    return [...this.aulasOrganizadas];
  }
}
