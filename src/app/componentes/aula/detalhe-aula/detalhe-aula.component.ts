import { Component, Input, OnInit } from '@angular/core';
import { Aula } from 'src/app/models/aula.model';

@Component({
  selector: 'app-detalhe-aula',
  templateUrl: './detalhe-aula.component.html',
  styleUrls: ['./detalhe-aula.component.css']
})
export class DetalheAulaComponent implements OnInit {
  editando: boolean = false;
  @Input() aula: Aula;

  constructor() { }

  ngOnInit(): void {
    
  }

}
