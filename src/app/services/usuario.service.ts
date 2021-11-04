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
  private subAuth = new Subject<{ usuario: Usuario, estaLogado: boolean }>();
  private userAuth0;


  buscarUsuario(email: string) {
    return this.http.get<{ msg: string, dadosUsuario: Usuario, valido: any }>(BACKEND_URL + email);
  }

  criarUsuario(dadosUsuario: { nome: string, email: string, tipo: number, materias: string }) {
    this.http.post(BACKEND_URL, dadosUsuario).subscribe(result => {
      console.log('usuario criado: ');
      console.log(result)
      this.login(this.userAuth0);
    });
  }

  checkAuth(){
    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {
      if(isAuth){
        this.auth.user$.subscribe(user => {
          this.userAuth0 = user;
          this.login(user);
        })
      }
    })
  }

  login(user) {
      this.buscarUsuario(user.email).subscribe(dados => {
        console.log('tentando buscar usuario:')
        console.log(dados.dadosUsuario)
        if (dados.dadosUsuario && dados.valido) {
          this.usuarioLogado = dados.dadosUsuario;
          this.estaLogado = true;
          this.subAuth.next({ usuario: { ...this.usuarioLogado }, estaLogado: this.estaLogado });
        } else if (!dados.valido) {
          console.log('achou usuario, porem email invalido')
          alert('E-mail Inválido!')
          this.auth.logout({ returnTo: 'http://localhost:4200' });
        } else if (!dados.dadosUsuario) {
          console.log('tentando criar usuario: ')
          console.log(dados)
          this.criarUsuario(user);
        }
      });
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
