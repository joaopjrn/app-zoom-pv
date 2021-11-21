import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Aula } from "../models/aula.model";
import { Conversa } from "../models/conversa.model";
import { Mensagem } from "../models/mensagem.model";

const BACKEND_URL = environment.apiUrl + "/chat/";
@Injectable({ providedIn: 'root' })
export class ChatService {
  private conversas: Conversa[] = [];
  private mensagensConversaAtiva: Mensagem[] = [];
  private conversaAtiva: Conversa;

  private conversasCarregadas = new Subject<boolean>();
  private conversaSelecionada = new Subject<boolean>();
  private mensagensCarregadas = new Subject<boolean>();

  constructor(private http: HttpClient){}

  buscarMensagens(idConversa: string){
    this.http.get<{msg: string, dados: any}>(BACKEND_URL+"conversa/"+idConversa).subscribe(resultado => {
      console.log(resultado)
      if(resultado.dados){
        this.mensagensConversaAtiva = resultado.dados;
        this.mensagensCarregadas.next(true);
      }
    })
  }

  enviarMensagem(idConversa: string, idEnviou: string, conteudo: string){
    const mensagem = { idConversa, idEnviou, conteudo };
    this.http.post<{msg: string, dados: any}>(BACKEND_URL+"mensagem/", mensagem).subscribe(resultado => [
      console.log(resultado)
    ])
  }

  buscarConversa(idMateria: string, idAluno: string){
    this.http.get<{msg: string, dados: any}>(BACKEND_URL+idMateria+"/"+idAluno).subscribe(resultado => {
      console.log(resultado);
    })
  }

  buscarConversas(idMateria: string){
    this.http.get<{msg: string, dados: any}>(BACKEND_URL+idMateria).subscribe(resultado => {
      console.log(resultado.dados)
      if(resultado.dados){
        this.conversas = resultado.dados;
        this.conversasCarregadas.next(true);
      }
    })
  }

  criarConversa(nomeProf: string, idAluno: string, nomeAluno: string, idMateria: string){
    const conversa = {
      idMateria: idMateria,
      aluno: {
        id: idAluno,
        nome: nomeAluno
      },
      professor: nomeProf
    }
    return this.http.post(BACKEND_URL, conversa);
  }

  setConversaAtiva(conversa: Conversa){
    this.conversaAtiva = conversa;
    this.conversaSelecionada.next(true);
  }

  getSubConversasCarregadas(){
    return this.conversasCarregadas.asObservable();
  }
  
  getSubMensagensCarregadas(){
    return this.mensagensCarregadas.asObservable();
  }

  getSubConversaSelecionada(){
    return this.conversaSelecionada.asObservable();
  }

  getConversas(){
    return [...this.conversas];
  }

  getMensagensConversaAtiva(){
    return [...this.mensagensConversaAtiva];
  }

  getConversaAtiva(){
    return {...this.conversaAtiva};
  }
}
