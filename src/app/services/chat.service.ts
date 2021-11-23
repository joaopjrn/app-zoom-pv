import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Aula } from "../models/aula.model";
import { Conversa } from "../models/conversa.model";
import { Mensagem } from "../models/mensagem.model";
import { Usuario } from "../models/usuario.model";
import { UsuarioService } from "./usuario.service";

const BACKEND_URL = environment.apiUrl + "/chat/";
@Injectable({ providedIn: 'root' })
export class ChatService {

  constructor(private http: HttpClient, private usuSvc: UsuarioService){}
  
  // ███    ███ ███████ ███    ██ ███████  █████   ██████  ███████ ███    ██ ███████
  // ████  ████ ██      ████   ██ ██      ██   ██ ██       ██      ████   ██ ██
  // ██ ████ ██ █████   ██ ██  ██ ███████ ███████ ██   ███ █████   ██ ██  ██ ███████
  // ██  ██  ██ ██      ██  ██ ██      ██ ██   ██ ██    ██ ██      ██  ██ ██      ██
  // ██      ██ ███████ ██   ████ ███████ ██   ██  ██████  ███████ ██   ████ ███████

  private mensagensConversaAtiva: Mensagem[] = [];
  private subMensagensCarregadas = new Subject<boolean>();

  buscarMensagens(idConversa: string, atualizando: boolean){
    let n = atualizando ? this.mensagensConversaAtiva.length : 0;
    // if(atualizando){
    //   n = this.mensagensConversaAtiva.length;
    // }else{
    //   n = 0;
    // }
    this.http.get<{msg: string, dados: Mensagem[]}>(BACKEND_URL+"conversa/"+idConversa+"/"+n).subscribe(resultado => {
      console.log(resultado)
      if(resultado.dados){
        if(!atualizando){
          this.mensagensConversaAtiva = resultado.dados;
          this.subConversaSelecionada.next(true);
        }else{
          resultado.dados.reverse().forEach(msg => {
            this.mensagensConversaAtiva.unshift(msg);
          })
          this.subMensagensCarregadas.next(true);
        }
      }
    })
  }

  enviarMensagem(idConversa: string, idEnviou: string, conteudo: string){
    const mensagem = { idConversa, idEnviou, conteudo };
    this.http.post<{msg: string, dados: Mensagem}>(BACKEND_URL+"mensagem/", mensagem).subscribe(resultado => {
      console.log(resultado.dados.conteudo)
      this.atualizarConversa(idConversa);
    })
    this.setNotif(idConversa, true, true);
  }

  atualizarConversa(idConversa: string){
    this.buscarMensagens(idConversa, true);
  }

  getSubMensagensCarregadas(){
    return this.subMensagensCarregadas.asObservable();
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
  private conversaSelecionada: boolean = false;

  private subConversasCarregadas = new Subject<boolean>();
  private subConversaSelecionada = new Subject<boolean>();

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
        this.subConversasCarregadas.next(true);
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

  setNotif(idConversa: string, valor: boolean, msg: boolean){
    let usuario = this.usuSvc.getUsuarioLogado();
    this.http.put(BACKEND_URL+"notif/", {idConversa: idConversa, valor: valor, isProf: usuario.tipo == 0, msg: msg}).subscribe(res => {
      console.log(res)
    });
  }

  setConversaAtiva(conversa: Conversa){
    let usuario = this.usuSvc.getUsuarioLogado();
    if(usuario.tipo === 0){
      conversa.notifProf = false;
    }else{
      conversa.notifAluno = false;
    }
    this.conversaAtiva = conversa;
    this.setNotif(conversa._id, false, false);
    this.buscarMensagens(conversa._id, false);
  }

  getSubConversasCarregadas(){
    return this.subConversasCarregadas.asObservable();
  }

  getSubConversaSelecionada(){
    return this.subConversaSelecionada.asObservable();
  }

  getConversas(){
    return [...this.conversas];
  }

  getConversaAtiva(){
    return {...this.conversaAtiva};
  }
}
