import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { Conversa } from 'src/app/models/conversa.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { AulasService } from 'src/app/services/aulas.service';
import { ChatService } from 'src/app/services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-aulas',
  templateUrl: './lista-aulas.component.html',
  styleUrls: ['./lista-aulas.component.css']
})
export class ListaAulasComponent implements OnInit, OnDestroy {

  @Input() idMateria: string;
  usuarioLogado: Usuario;

  listaAulas = [([] as Aula[]),([] as Aula[])];
  anotacoesBuscadas: string[] = [];
  conversaCarregada: boolean = false;
  conversa: Conversa;

  listaAulasListener: Subscription;
  subConversaSelecionada: Subscription;

  constructor(private aulasSvc: AulasService, private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService, private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
    this.aulasSvc.buscarAulas(this.idMateria, this.usuarioLogado.tipo);

    this.listaAulasListener = this.aulasSvc.getSubAulasCarregadas().subscribe(aulasCarregadas => {
      if (aulasCarregadas) {
        this.listaAulas = this.aulasSvc.getAulas();
      }
    });
    if(this.usuarioLogado.tipo === 1){
      this.chatSvc.buscarConversa(this.idMateria, this.usuarioLogado._id)

      this.subConversaSelecionada = this.chatSvc.getSubConversaSelecionada().subscribe(res => {
        this.conversa = this.chatSvc.getConversaAtiva();
        console.log(this.conversa)
        this.conversaCarregada = true;
      })
    }
  }

  ngOnDestroy(){
    if(this.subConversaSelecionada && !this.subConversaSelecionada.closed){
      this.subConversaSelecionada.unsubscribe();
    }
    this.listaAulasListener.unsubscribe();
  }

  troqueiTab(ev: number){
    this.aulasSvc.mudarAba(ev);
    if(this.usuarioLogado.tipo === 1 && ev === 2){
      this.conversa.notifAluno = false;
      this.chatSvc.setNotif(this.conversa._id, false, false);
    }
  }


}
