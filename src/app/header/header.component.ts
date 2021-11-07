import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loginListener: Subscription;

  constructor(public auth: AuthService, public usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isLoading$.subscribe(res => {
      console.log('isLoading: '+res)
    })
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
    this.loginListener.unsubscribe();
  }

}
