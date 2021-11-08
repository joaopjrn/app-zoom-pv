import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private usuarioLogado: Usuario;
  private subDadosUsuario: Subscription;
  private subMaterias: Subscription;
  
  carregando: boolean = true;
  materias: Materia[] = [];


  constructor(private materiasSvc: MateriasService, public usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
    console.log('lista de matérias oninit');
    this.materiasSvc.buscarMaterias(JSON.stringify(this.usuarioLogado.materias));

    this.materiasSvc.getMateriasObs().subscribe(materiasBuscadas => {
      this.materias = materiasBuscadas;
      this.carregando = false;
    })
  }

  ngOnDestroy(){
    this.subMaterias.unsubscribe();
    this.subDadosUsuario.unsubscribe();
    // this.subAuth.unsubscribe();
  }

}
