import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Conversa } from 'src/app/models/conversa.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lista-conversa',
  templateUrl: './lista-conversa.component.html',
  styleUrls: ['./lista-conversa.component.css']
})
export class ListaConversaComponent implements OnInit {

  conversas: Conversa[];

  subConversasCarregadas: Subscription;

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.subConversasCarregadas = this.chatSvc.getSubConversasCarregadas().subscribe(resultado => {
      this.conversas = this.chatSvc.getConversas();
    })
  }

  setConversaAtiva(conversa: Conversa){
    this.chatSvc.setConversaAtiva(conversa);
    this.chatSvc.buscarMensagens(conversa._id);
    // this.chatSvc.buscarMensagens(this.chatSvc.getConversaAtiva()._id);
  }

}
