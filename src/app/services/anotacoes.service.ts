import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Anotacao } from "../models/anotacao.model";

const BACKEND_URL = environment.apiUrl + "/anotacao/";
@Injectable({providedIn: 'root'})
export class AnotacoesServico {
  private anotacoesBuscadas: string[] = [];

  private subAnotacaoBuscada = new Subject<Anotacao>();

  constructor(private http: HttpClient){}

  criarAnotacao(anotacao: any){
    this.http.post(BACKEND_URL, anotacao).subscribe(res => {
      console.log(res)
    })
  }

  buscarAnotacao(cod: string){
    this.http.get<{msg: string, anotacao: Anotacao}>(BACKEND_URL+cod).subscribe(anotacaoBuscada => {
      // console.log(anotacaoBuscada)
      this.subAnotacaoBuscada.next(anotacaoBuscada.anotacao);
    })
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