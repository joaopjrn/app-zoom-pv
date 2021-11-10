import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Materia } from 'src/app/models/materia.model';
import { CriarTurmaComponent } from '../../modais/criar-turma/criar-turma.component';
import { ExcluirComponent } from '../../modais/excluir/excluir.component';


@Component({
  selector: 'app-item-materia',
  templateUrl: './item-materia.component.html',
  styleUrls: ['./item-materia.component.css']
})
export class ItemMateriaComponent implements OnInit {
  @Input() materia: Materia;

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
  }

  excluirMateria(){
    this.modal.open(ExcluirComponent, {data: {idMateria: this.materia._id, titulo: 'Deseja excluir essa matéria?'}});
  }

  editarMateria(){
    this.modal.open(CriarTurmaComponent, {data: {materia: this.materia}});
  }

}
