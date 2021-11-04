import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario.model";

const BACKEND_URL = environment.apiUrl + '/usuario/';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private usuarioLogado: Usuario;
  private estaLogado: boolean = false;
  private subAuth = new Subject<{usuario: Usuario, estaLogado: boolean}>();


  buscarUsuario(email: string) {
    return this.http.get<{ msg: string, dadosUsuario: Usuario, valido: any }>(BACKEND_URL + email);
  }

  criarUsuario(dadosUsuario: { nome: string, email: string, tipo: number, materias: string }) {
    this.http.post(BACKEND_URL, dadosUsuario).subscribe(result => {
      console.log(result);
    });
  }

  login() {
    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.auth.user$.subscribe(dadosUsuario => {
          this.buscarUsuario(dadosUsuario.email).subscribe(dadosUsuario => {
            console.log(dadosUsuario.dadosUsuario)
            if (dadosUsuario.dadosUsuario && dadosUsuario.valido) {
              this.usuarioLogado = dadosUsuario.dadosUsuario;
              this.estaLogado = true;
              this.subAuth.next({usuario: {...this.usuarioLogado}, estaLogado: this.estaLogado});
            } else if (!dadosUsuario.valido) {
              alert('E-mail Inválido!')
              this.auth.logout({ returnTo: 'http://localhost:4200' });
            } else if (!dadosUsuario.dadosUsuario) {
              let novoUsuario = {
                nome: dadosUsuario.dadosUsuario.nome,
                email: dadosUsuario.dadosUsuario.email,
                tipo: null,
                materias: JSON.stringify([])
              }
              this.criarUsuario(novoUsuario);
            }
          });
        });
      }else{
        console.log('não logado')
      }
    })
  }

  getSubAuth() {
    return this.subAuth.asObservable();
  }

  setUsuarioLogado(usuarioLogado) {
    this.usuarioLogado = usuarioLogado;
  }

  getUsuarioLogado() {
    return this.usuarioLogado;
  }

  getEstaLogado() {
    return this.estaLogado;
  }

  setEstaLogado(estaLogado: boolean) {
    this.estaLogado = estaLogado;
  }
}
