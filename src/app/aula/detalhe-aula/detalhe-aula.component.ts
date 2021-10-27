import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-aula',
  templateUrl: './detalhe-aula.component.html',
  styleUrls: ['./detalhe-aula.component.css']
})
export class DetalheAulaComponent implements OnInit {
  editando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
