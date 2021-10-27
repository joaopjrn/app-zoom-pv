import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-aulas',
  templateUrl: './lista-aulas.component.html',
  styleUrls: ['./lista-aulas.component.css']
})
export class ListaAulasComponent implements OnInit {

  @Input() aulasAnteriores: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }


}
