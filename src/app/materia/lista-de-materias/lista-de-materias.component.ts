import { Component, OnInit } from '@angular/core';
import { Materia } from '../materia.model';

@Component({
  selector: 'app-lista-de-materias',
  templateUrl: './lista-de-materias.component.html',
  styleUrls: ['./lista-de-materias.component.css']
})
export class ListaDeMateriasComponent implements OnInit {

  materias: Materia[] = [
    {id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
