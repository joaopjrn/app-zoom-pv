import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-conversa',
  templateUrl: './lista-conversa.component.html',
  styleUrls: ['./lista-conversa.component.css']
})
export class ListaConversaComponent implements OnInit {

  conversas = ['João Pedro Nunes', 'Maria Silva Santos', 'Caio Santos Silva']
  constructor() { }

  ngOnInit(): void {
  }

}
