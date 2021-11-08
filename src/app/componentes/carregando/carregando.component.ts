import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  subDadosUsuario: Subscription;

  ngOnInit(): void {
    this.usuarioSvc.checkAuth();

    this.subEstaLogado = this.usuarioSvc.getSubLogado().subscribe(estaLogado => {
      console.log('recebendo subEstaLogado em "carregando"');
      if(estaLogado){
        this.materiaSvc.buscarMaterias(JSON.stringify(this.usuarioSvc.getUsuarioLogado().materias));
      }else{
        this.router.navigate(['bem-vindo'])
      }
    });


    this.subMateriasCarregadas = this.materiaSvc.getSubMateriasCarregadas().subscribe(materiasCarregadas => {
      console.log('recebendo materias carregadas em "carregando"');
      if(materiasCarregadas){
        this.router.navigate(['inicio']);
      }
    });
  }

  ngOnDestroy(){
    this.subEstaLogado.unsubscribe();
    this.subMateriasCarregadas.unsubscribe();
  }

}
