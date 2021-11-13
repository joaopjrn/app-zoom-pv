import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carregando',
  templateUrl: './carregando.component.html',
  styleUrls: ['./carregando.component.css']
})
export class CarregandoComponent implements OnInit, OnDestroy {

  constructor(private usuarioSvc: UsuarioService, private materiaSvc: MateriasService, private router: Router) { }

  subEstaLogado: Subscription;
  subMateriasCarregadas: Subscription;
  usuarioLogado: Usuario;

  ngOnInit(): void {
    console.log('carregando onInit')
    this.subEstaLogado = this.usuarioSvc.getSubLogado().subscribe(estaLogado => {
      console.log('recebendo subEstaLogado em "carregando"');
      if(estaLogado){
        this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
        this.materiaSvc.buscarMaterias(this.usuarioLogado.materias);
      }else if(!estaLogado){
        this.router.navigate(['bem-vindo'])
      }
    });
    this.subMateriasCarregadas = this.materiaSvc.getSubMateriasCarregadas().subscribe(materiasCarregadas => {
      console.log('recebendo materias carregadas em "carregando"');
      if(materiasCarregadas){
        this.router.navigate(['inicio']);
      }
    });

    this.usuarioSvc.checkAuth();
  }

  ngOnDestroy(){
    this.subEstaLogado.unsubscribe();
    this.subMateriasCarregadas.unsubscribe();
  }

}
