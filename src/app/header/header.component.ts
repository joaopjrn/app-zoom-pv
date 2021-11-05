import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // estaLogado: boolean = false;
  // usuario: Usuario;
  // inicioLogin: any;
  loginListener: Subscription;

  constructor(public auth: AuthService, public usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioSvc.checkAuth();
    this.loginListener = this.usuarioSvc.getSubAuth().subscribe(res => {
      if(res){
        this.router.navigate(['inicio']);
      }
    })
  }

  login(){
    // this.usuarioSvc.login();
  }

  ngOnDestroy(){
    // this.estaLogadoListener.unsubscribe();
  }

}
