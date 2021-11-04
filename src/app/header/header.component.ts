import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  estaLogado: boolean = false;
  usuario: Usuario;
  estaLogadoListener: Subscription;

  constructor(public auth: AuthService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.estaLogadoListener = this.usuarioSvc.getSubAuth().subscribe(res => {
      this.estaLogado = res.estaLogado;
      this.usuario = res.usuario;
    })
    this.auth.isAuthenticated$.subscribe(logado => {
      this.estaLogado = logado;
      if(this.estaLogado){
        this.usuarioSvc.login();
      }
    });
  }

  login(){
    this.usuarioSvc.login();
  }

  ngOnDestroy(){
    this.estaLogadoListener.unsubscribe();
  }

}
