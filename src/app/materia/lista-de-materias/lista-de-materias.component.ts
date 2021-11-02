import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-lista-de-materias',
  templateUrl: './lista-de-materias.component.html',
  styleUrls: ['./lista-de-materias.component.css']
})
export class ListaDeMateriasComponent implements OnInit, OnDestroy {
  
  private subMaterias: Subscription;
  carregando = true;

  usuario: Usuario  = {
    _id: 'ahsuhaushau',
    nome: 'Fulano Silva',
    email: 'fulano@email.com',
    senha: 'senha',
    tipo: 0,
    materias: ['61809b8fa1050cdf6e1b05fc','6180a80920ff081600872b24']
  }

  materias: Materia[] = [
    /*{id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},*/
  ];


  constructor(private materiasSvc: MateriasService) { }

  ngOnInit(): void {
    this.materiasSvc.buscarMaterias(this.usuario.materias);
    this.subMaterias = this.materiasSvc.getMateriasObs().subscribe((materias: Materia[]) => {
      this.materias = materias;
      this.carregando = false;
    });
  }

  ngOnDestroy(){
    this.subMaterias.unsubscribe();
  }

}
