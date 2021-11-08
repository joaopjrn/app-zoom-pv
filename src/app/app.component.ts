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

  }

  ngOnDestroy(){

  }

}
