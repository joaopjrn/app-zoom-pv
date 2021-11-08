import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usuarioSvc: UsuarioService, private router: Router, private auth0: AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(Object.keys(this.usuarioSvc.getUserAuth0()).length === 0){
      console.log('Rota bloqueada, não logado em Auth0');
      this.router.navigate(['/'])
      return false;
    }
    if(!this.usuarioSvc.getUserAuth0().email.includes('saojudas')){
      console.log('Rota bloqueada, email inválido!');
      this.auth0.logout();
      return false;
    }
    if(!this.usuarioSvc.getEstaLogado()){
      console.log('Rota Bloqueada!')
      this.router.navigate(['/']);
      return false;
    }
    return this.usuarioSvc.getEstaLogado();
  }

}