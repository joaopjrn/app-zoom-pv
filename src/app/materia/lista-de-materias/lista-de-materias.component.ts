import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-lista-de-materias',
  templateUrl: './lista-de-materias.component.html',
  styleUrls: ['./lista-de-materias.component.css']
})
export class ListaDeMateriasComponent implements OnInit, OnDestroy {

  private subMaterias: Subscription;
  carregando = true;

  usuario: Usuario;

  materias: Materia[] = [
    /*{id: 'materia1', nome: 'Matéria 1', professor: 'Professor 1'},
    {id: 'materia2', nome: 'Matéria 2', professor: 'Professor 2'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},
    {id: 'materia3', nome: 'Matéria 3', professor: 'Professor 3'},*/
  ];


  constructor(private materiasSvc: MateriasService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.usuario = this.usuarioSvc.getUsuarioLogado();
      this.materiasSvc.buscarMaterias(JSON.stringify(this.usuario.materias));
      this.subMaterias = this.materiasSvc.getMateriasObs().subscribe((materias: Materia[]) => {
        this.materias = materias;
        this.carregando = false;
      });
    }, 3000);
  }

  ngOnDestroy(){
    this.subMaterias.unsubscribe();
  }

}
