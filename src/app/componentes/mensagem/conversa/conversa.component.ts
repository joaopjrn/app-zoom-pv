import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Conversa } from 'src/app/models/conversa.model';
import { Mensagem } from 'src/app/models/mensagem.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ChatService } from 'src/app/services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.css']
})
export class ConversaComponent implements OnInit, OnDestroy {

  mensagens: Mensagem[] = [];
  usuarioLogado: Usuario;
  conversaAtiva: Conversa;
  texto: string = '';

  subConversaSelecionada: Subscription;
  subMensagensCarregadas: Subscription;

  constructor(private chatSvc: ChatService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
      this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
      this.conversaAtiva = this.chatSvc.getConversaAtiva();
      this.mensagens = this.chatSvc.getMensagensConversaAtiva();

    this.subMensagensCarregadas = this.chatSvc.getSubMensagensCarregadas().subscribe(res => {
      this.mensagens = this.chatSvc.getMensagensConversaAtiva();
    })

    this.chatSvc.getSubConversaSelecionada().subscribe(resultado => {
      this.conversaAtiva = this.chatSvc.getConversaAtiva();
      this.mensagens = this.chatSvc.getMensagensConversaAtiva();
    })

  }

  atualizarConversa(){
    this.chatSvc.atualizarConversa(this.conversaAtiva._id);
  }

  checarMsg(ev: KeyboardEvent){
    console.log(this.texto)
    if(ev.code === "Space" && this.texto.trim().length < 1){
      ev.preventDefault();
    }
  }

  enviar(form: NgForm){
    if(form.invalid){
      console.log('form invalido')
      return;
    }

    let msg = this.texto.trim();
    if(msg.length < 1){
      return;
    }
    this.chatSvc.enviarMensagem(this.conversaAtiva._id, this.usuarioLogado._id, msg);
    form.reset();
    form.resetForm();
    this.texto = '';
  }

  ngOnDestroy(){
    this.subConversaSelecionada.unsubscribe();
    this.subMensagensCarregadas.unsubscribe();
  }

}
