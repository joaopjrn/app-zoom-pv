import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  usuarioLogado: Usuario;
  constructor(private modal: MatDialog, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
    this.hue = `filter:hue-rotate(${this.materia.hue}deg);`
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

  sairMateria(){
    this.modal.open(ExcluirComponent, {data: {item: {idMateria: this.materia._id, tipo: 'sair'}, titulo: 'Deseja sair dessa turma?'}})
  }

}
