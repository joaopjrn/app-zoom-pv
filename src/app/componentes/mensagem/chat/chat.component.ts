import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AulasService } from 'src/app/services/aulas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usuarioLogado: Usuario;
  mudouAbaListener: Subscription;

  constructor(private usuarioSvc: UsuarioService, private aulaSvc: AulasService) { }

  ngOnInit(): void {
    console.log('chat OnInit')
    
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();

    this.mudouAbaListener = this.aulaSvc.getSubMudouAba().subscribe(mudouAba => {
      if(mudouAba == 2){
        console.log('estou na aba do chat')
      }
    });

  }

}
