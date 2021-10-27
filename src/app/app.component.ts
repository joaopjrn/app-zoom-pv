import { Component } from '@angular/core';
import { MaterialModule } from './material.module';
import { Materia } from './materia/materia.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  materias: Materia[] = [
    {id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
  ];
}
