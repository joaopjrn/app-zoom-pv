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
  private subMaterias: Subscription;
  private subAuth: Subscription;
  
  carregando: boolean;
  materias: Materia[] = [];


  constructor(private materiasSvc: MateriasService, public usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.carregando = true;
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();

    // this.subAuth = this.usuarioSvc.getSubAuth().subscribe(res => {
    //   if(res){
    //   }
    // })
    if(this.usuarioLogado.materias.length > 0){
      this.materiasSvc.buscarMaterias(JSON.stringify(this.usuarioLogado.materias));
    }else{
      this.carregando = false;
    }

    this.subMaterias = this.materiasSvc.getMateriasObs().subscribe(result => {
      this.materias = result;
      this.carregando = false;
    })
    // this.subAuth = this.usuarioSvc.getSubAuth().subscribe(res => {
    //   if(res.estaLogado){
    //     console.log('loguei')
    //     this.usuario = res.usuario;
    //     this.materiasSvc.buscarMaterias(JSON.stringify(this.usuario.materias));
    //     this.subMaterias = this.materiasSvc.getMateriasObs().subscribe((materias: Materia[]) => {
    //       this.materias = materias;
    //       this.carregando = false;
    //     });
    //   }
    // })
  }

  ngOnDestroy(){
    this.subMaterias.unsubscribe();
    // this.subAuth.unsubscribe();
  }

}
