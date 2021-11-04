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
  private subAuth: Subscription;
  carregando = true;

  usuario: Usuario;

  materias: Materia[] = [];


  constructor(private materiasSvc: MateriasService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    if(this.usuarioSvc.getEstaLogado()){
      this.usuario = this.usuarioSvc.getUsuarioLogado();
      
    }
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
    this.subAuth.unsubscribe();
  }

}
