import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioAuth0: User;
  subEstaLogado: Subscription;

  constructor(public auth: AuthService, public usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.subEstaLogado = this.usuarioSvc.getSubLogado().subscribe(estaLogado => {
      if(estaLogado){
        this.usuarioAuth0 = this.usuarioSvc.getUserAuth0();
      }
    })
    console.log('header oninit')

  }

  ngOnDestroy(){
    this.subEstaLogado.unsubscribe();
  }

}
