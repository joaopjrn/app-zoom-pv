import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarAulaComponent } from 'src/app/modais/criar-aula/criar-aula.component';

@Component({
  selector: 'app-detalhe-materia',
  templateUrl: './detalhe-materia.component.html',
  styleUrls: ['./detalhe-materia.component.css']
})
export class DetalheMateriaComponent implements OnInit {

  dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
  }

  criarAula(){
    this.modal.open(CriarAulaComponent);
  }
}
