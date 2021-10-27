import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarTurmaComponent } from 'src/app/modais/criar-turma/criar-turma.component';
import { EntrarTurmaComponent } from 'src/app/modais/entrar-turma/entrar-turma.component';

@Component({
  selector: 'app-barra-botoes',
  templateUrl: './barra-botoes.component.html',
  styleUrls: ['./barra-botoes.component.css']
})
export class BarraBotoesComponent implements OnInit {

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
  }

  criarTurma(){
    this.modal.open(CriarTurmaComponent);
  }

  entrarTurma(){
    this.modal.open(EntrarTurmaComponent);
  }

}
