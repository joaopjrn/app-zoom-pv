import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { User } from "@auth0/auth0-spa-js";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario.model";

const BACKEND_URL = environment.apiUrl + '/usuario/';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private usuarioLogado: Usuario;
  private estaLogado: boolean = false;
  private userAuth0: User;

  private subEstaLogado = new Subject<boolean>();
  private subDadosCarregados = new Subject<boolean>();

  checkAuth() {
    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.auth.user$.subscribe(user => {
          console.log(user)
          this.userAuth0 = user;
          this.setLogado(true);
          this.processarLogin();
        });
      } else {
        console.log('checkAuth falso')
        // this.subAuth.next(false);
        this.setLogado(false);
        //nada
      }
    })
  }

  processarLogin() {
    console.log('processando login')
    this.buscarUsuario(this.userAuth0.email)
      .subscribe((usuarioBanco: { msg: string, dadosUsuario: Usuario, valido: boolean }) => {
        if (usuarioBanco.dadosUsuario) {
          //se encontrou dados do usuário no banco, seta dados e avisa
          this.usuarioLogado = usuarioBanco.dadosUsuario;
          console.log('login processado após encontrar usuário no banco')
          console.log(this.usuarioLogado)
          this.subDadosCarregados.next(true);
        } else if (!usuarioBanco.dadosUsuario && usuarioBanco.valido) {
          //se usuario não existe no banco e o email é válido, cria usuario novo
          this.criarUsuario(this.userAuth0);
        }
        else if (!usuarioBanco.dadosUsuario && !usuarioBanco.valido) {
          //email não é da são judas
          console.log('email inválido')
          this.setLogado(false);
          this.auth.logout();
        }
      })
  }

  setLogado(isLogado: boolean) {
    if(!isLogado){
      console.log('não está logado')
    }else{
      console.log('está logado')
    }
    this.estaLogado = isLogado;
    this.subEstaLogado.next(isLogado);
  }

  buscarUsuario(email: string) {
    return this.http.get<{ msg: string, dadosUsuario: Usuario, valido: any }>(BACKEND_URL + email);
  }

  criarUsuario(dadosUsuario: any) {
    this.http.post<{ msg: string, dados: Usuario }>(BACKEND_URL, dadosUsuario).subscribe(result => {
      this.usuarioLogado = result.dados;
      console.log('login processado após criar usuário')
      this.subDadosCarregados.next(true);
    });;
  }

  atualizarUsuario(usuario: Usuario) {
    return this.http.put<{ msg: string, atualizado: boolean }>(BACKEND_URL, usuario);
  }

  entrarTurma(idTurma: string, usuario: Usuario) {
    usuario.materias.push(idTurma);
    return this.atualizarUsuario(usuario);
  }


  getSubLogado() {
    return this.subEstaLogado.asObservable();
  }

  getSubDadosUsuario() {
    return this.subDadosCarregados.asObservable();
  }

  getUsuarioLogado() {
    return { ...this.usuarioLogado };
  }

  getEstaLogado() {
    return this.estaLogado;
  }

  getUserAuth0() {
    return { ...this.userAuth0 };
  }
}