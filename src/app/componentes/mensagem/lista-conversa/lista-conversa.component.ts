import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Conversa } from 'src/app/models/conversa.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lista-conversa',
  templateUrl: './lista-conversa.component.html',
  styleUrls: ['./lista-conversa.component.css']
})
export class ListaConversaComponent implements OnInit, OnDestroy {

  conversas: Conversa[] = [];
  conversasFiltradas: Conversa[] = [];

  subConversasCarregadas: Subscription;

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    console.log('lista-conversa onInit')
    this.subConversasCarregadas = this.chatSvc.getSubConversasCarregadas().subscribe(resultado => {
      console.log('oi')
      this.conversas = this.chatSvc.getConversas();
    })
  }

  setConversaAtiva(conversa: Conversa){
    this.chatSvc.setConversaAtiva(conversa);
    // this.chatSvc.setNotif(conversa._id, false);
  }

  filtrar(busca: string){
    this.conversasFiltradas = this.conversas.filter(
      conversa => this.limparString(conversa.aluno.nome).includes(this.limparString(busca)));
  }

  limparString(str: string){
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  ngOnDestroy(){
    console.log('onDestroy')
    this.subConversasCarregadas.unsubscribe();
  }

}
