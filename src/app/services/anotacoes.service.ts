import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Anotacao } from "../models/anotacao.model";

const BACKEND_URL = environment.apiUrl + "/anotacao/";
@Injectable({providedIn: 'root'})
export class AnotacoesServico {
  private anotacoesBuscadas: string[] = [];

  private subAnotacaoBuscada = new Subject<Anotacao>();

  constructor(private http: HttpClient, private snackbar: MatSnackBar){}

  criarAnotacao(anotacao: any){
    return this.http.post(BACKEND_URL, anotacao);
  }

  buscarAnotacao(cod: string){
    this.http.get<{msg: string, anotacao: Anotacao}>(BACKEND_URL+cod).subscribe(anotacaoBuscada => {
      // console.log(anotacaoBuscada)
      this.subAnotacaoBuscada.next(anotacaoBuscada.anotacao);
    })
  }

  alterarAnotacao(anotacaoAlterada: Anotacao){
    return this.http.put(BACKEND_URL, anotacaoAlterada)
  }

  excluirAnotacao(id: string){
    return this.http.delete(BACKEND_URL+id)
  }

  getSubAnotacaoBuscada(){
    return this.subAnotacaoBuscada.asObservable();
  }

  getAnotacoesBuscadas(){
    return [...this.anotacoesBuscadas];
  }

  anotacaoJaBuscada(codigo){
    if(this.anotacoesBuscadas.includes(codigo)){
      return true;
    }
    this.anotacoesBuscadas.push(codigo);
    return false;
  }

  limparAnotacoes(){
    console.log('limpando anotações')
    this.anotacoesBuscadas = [];
  }

}
