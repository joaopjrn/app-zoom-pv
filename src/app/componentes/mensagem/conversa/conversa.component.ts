import { Component, OnInit } from '@angular/core';
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
export class ConversaComponent implements OnInit {

  mensagens: Mensagem[];
  usuarioLogado: Usuario;

  subMensagensCarregadas: Subscription;

  constructor(private chatSvc: ChatService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();

    this.chatSvc.buscarMensagens(this.chatSvc.getConversaAtiva()._id);

    this.subMensagensCarregadas = this.chatSvc.getSubMensagensCarregadas().subscribe(resultado => {
      this.mensagens = this.chatSvc.getMensagensConversaAtiva();
    })
  }

  enviar(form: NgForm){
    console.log(form.value.msg)
    this.chatSvc.enviarMensagem(this.chatSvc.getConversaAtiva()._id, this.usuarioLogado._id ,form.value.msg);
    form.reset();
  }

}
