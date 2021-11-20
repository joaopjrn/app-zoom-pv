import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {

  usuarioLogado: Usuario;
  mudouAbaListener: Subscription;
  conversaSelecionada: boolean = false;
  subConversaAtiva: Subscription;

  constructor(private usuarioSvc: UsuarioService, private aulaSvc: AulasService, private chatSvc: ChatService, private matSvc: MateriasService) { }

  ngOnInit(): void {
    console.log('chat OnInit')

    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();

    this.subConversaAtiva = this.chatSvc.getSubConversaSelecionada().subscribe(resultado => {
      this.conversaSelecionada = true;
    })

    this.mudouAbaListener = this.aulaSvc.getSubMudouAba().subscribe(mudouAba => {
      if(mudouAba == 2){
        console.log('estou na aba do chat')
        this.chatSvc.buscarConversas(this.matSvc.getMateriaAtiva()._id);
      }
    });

  }

}
