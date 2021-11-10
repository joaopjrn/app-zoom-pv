import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { AnotacoesServico } from "../services/anotacoes.service";
import { UsuarioService } from "../services/usuario.service";

@Injectable()
export class LimparGuard implements CanActivate {
  constructor(private anotaSvc: AnotacoesServico){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.anotaSvc.limparAnotacoes();
    return true;
  }

}
