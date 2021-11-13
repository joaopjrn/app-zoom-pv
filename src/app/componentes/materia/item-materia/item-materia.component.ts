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
  hue: string;

  imgs: string[] = [
    "../../../../assets/img/bio-1.png",
    "../../../../assets/img/bio-2.png",
    "../../../../assets/img/exatas-1.png",
    "../../../../assets/img/exatas-2.png",
    "../../../../assets/img/humanas-1.png",
    "../../../../assets/img/saude-1.png",
    "../../../../assets/img/saude-2.png",
    "../../../../assets/img/tech-1.png",
    "../../../../assets/img/tech-2.png"
  ];

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
    this.materia.linkImg = this.imgs[this.getRandomInt(0, (this.imgs.length - 1))];
    this.hue = `filter:hue-rotate(${this.getRandomInt(0,360)}deg);`
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  excluirMateria(){
    this.modal.open(ExcluirComponent, {data: {item: {id: this.materia._id, tipo: 'materia'}, titulo: 'Deseja excluir essa matéria?'}});
  }

  editarMateria(){
    this.modal.open(CriarTurmaComponent, {data: {materia: this.materia}});
  }

}
