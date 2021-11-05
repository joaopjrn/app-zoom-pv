import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usuarioSvc: UsuarioService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.usuarioSvc.getEstaLogado()){
      this.router.navigate(['/']);
    }
    return this.usuarioSvc.getEstaLogado();
  }

}