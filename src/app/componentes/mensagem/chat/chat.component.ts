import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AulasService } from 'src/app/services/aulas.service';
import { ChatService } from 'src/app/services/chat.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  usuarioLogado: Usuario;
  conversaSelecionada: boolean = false;

  subConversaAtiva: Subscription;
  mudouAbaListener: Subscription;

  constructor(private usuarioSvc: UsuarioService, private aulaSvc: AulasService, private chatSvc: ChatService, private matSvc: MateriasService) { }

  ngOnInit(): void {
    console.log('chat OnInit')

    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();

    this.mudouAbaListener = this.aulaSvc.getSubMudouAba().subscribe(mudouAba => {
      if(mudouAba == 2){
        if(this.usuarioLogado.tipo === 1){
          this.conversaSelecionada = true;
        }
        if(this.usuarioLogado.tipo == 0){
          this.subConversaAtiva = this.chatSvc.getSubConversaSelecionada().subscribe(resultado => {
            this.conversaSelecionada = true;
            this.subConversaAtiva.unsubscribe();
          });
          this.chatSvc.buscarConversas(this.matSvc.getMateriaAtiva()._id);
        }
      }
    });

  }
ngOnDestroy(){
  this.mudouAbaListener.unsubscribe();
  if(this.subConversaAtiva && !this.subConversaAtiva.closed){
    this.subConversaAtiva.unsubscribe();
  }
}

}
