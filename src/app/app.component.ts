import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Subscription } from 'rxjs';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userAuth0: User;
  carregando: boolean;
  estaLogadoSub: Subscription;

  constructor(private usuarioSvc: UsuarioService){}
  
  ngOnInit(): void {
    this.carregando = true;
    this.usuarioSvc.checkAuth();
    this.estaLogadoSub = this.usuarioSvc.getSubLogado().subscribe(estaLogado => {
      console.log('recebendo estado de logado: '+estaLogado)
      if(estaLogado){
        this.userAuth0 = this.usuarioSvc.getUserAuth0();
      }
      console.log('carregamento terminou')
      this.carregando = false;
    })
  }

  ngOnDestroy(){
    this.estaLogadoSub.unsubscribe();
  }

}
