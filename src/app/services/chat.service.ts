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

  constructor(private http: HttpClient){}
  
  // ███    ███ ███████ ███    ██ ███████  █████   ██████  ███████ ███    ██ ███████ 
  // ████  ████ ██      ████   ██ ██      ██   ██ ██       ██      ████   ██ ██      
  // ██ ████ ██ █████   ██ ██  ██ ███████ ███████ ██   ███ █████   ██ ██  ██ ███████ 
  // ██  ██  ██ ██      ██  ██ ██      ██ ██   ██ ██    ██ ██      ██  ██ ██      ██ 
  // ██      ██ ███████ ██   ████ ███████ ██   ██  ██████  ███████ ██   ████ ███████
  
  private mensagensConversaAtiva: Mensagem[] = [];
  // private mensagensCarregadas = new Subject<boolean>();

  buscarMensagens(idConversa: string){
    this.http.get<{msg: string, dados: any}>(BACKEND_URL+"conversa/"+idConversa).subscribe(resultado => {
      console.log(resultado)
      if(resultado.dados){
        this.mensagensConversaAtiva = resultado.dados;
        this.conversaSelecionada.next(true);
      }
    })
  }

  enviarMensagem(idConversa: string, idEnviou: string, conteudo: string){
    const mensagem = { idConversa, idEnviou, conteudo };
    this.http.post<{msg: string, dados: any}>(BACKEND_URL+"mensagem/", mensagem).subscribe(resultado => [
      console.log(resultado)
    ])
  }

  getMensagensConversaAtiva(){
    return [...this.mensagensConversaAtiva];
  }

  // ██████   ██████  ███    ██ ██    ██ ███████ ██████  ███████  █████  ███████ 
  // ██      ██    ██ ████   ██ ██    ██ ██      ██   ██ ██      ██   ██ ██      
  // ██      ██    ██ ██ ██  ██ ██    ██ █████   ██████  ███████ ███████ ███████ 
  // ██      ██    ██ ██  ██ ██  ██  ██  ██      ██   ██      ██ ██   ██      ██ 
  // ██████   ██████  ██   ████   ████   ███████ ██   ██ ███████ ██   ██ ███████

  private conversas: Conversa[] = [];
  private conversaAtiva: Conversa;

  private conversasCarregadas = new Subject<boolean>();
  private conversaSelecionada = new Subject<boolean>();

  buscarConversa(idMateria: string, idAluno: string){
    this.http.get<{msg: string, dados: Conversa}>(BACKEND_URL+idMateria+"/"+idAluno).subscribe(resultado => {
      console.log(resultado);
      this.setConversaAtiva(resultado.dados)
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
    this.buscarMensagens(conversa._id);
  }

  getSubConversasCarregadas(){
    return this.conversasCarregadas.asObservable();
  }

  getSubConversaSelecionada(){
    return this.conversaSelecionada.asObservable();
  }

  getConversas(){
    return [...this.conversas];
  }

  getConversaAtiva(){
    return {...this.conversaAtiva};
  }
}
