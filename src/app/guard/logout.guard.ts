import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/usuario.service";

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private usuarioSvc: UsuarioService, private auth0: AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.usuarioSvc.getUserAuth0() && !this.usuarioSvc.getUserAuth0().email.includes('saojudas')){
      console.log('Rota bloqueada, email inválido!');
      this.auth0.logout();
      return false;
    }
    return true;
  }

}