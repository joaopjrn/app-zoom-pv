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

  conversas: Conversa[] = [];
  conversasFiltradas: Conversa[] = [];

  subConversasCarregadas: Subscription;

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.subConversasCarregadas = this.chatSvc.getSubConversasCarregadas().subscribe(resultado => {
      this.conversas = this.chatSvc.getConversas();
    })
  }

  setConversaAtiva(conversa: Conversa){
    this.chatSvc.setConversaAtiva(conversa);
  }

  filtrar(busca: string){
    this.conversasFiltradas = this.conversas.filter(
      conversa => this.limparString(conversa.aluno.nome).includes(this.limparString(busca)));
  }

  limparString(str: string){
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
