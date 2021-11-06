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
  private subAuth = new Subject<boolean>();
  private userAuth0: User;


  buscarUsuario(email: string) {
    return this.http.get<{ msg: string, dadosUsuario: Usuario, valido: any }>(BACKEND_URL + email);
  }

  criarUsuario(dadosUsuario: any) {
    return this.http.post<{msg: string, dados: any}>(BACKEND_URL, dadosUsuario);
  }

  checkAuth(){
    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {
      if(isAuth){
        this.auth.user$.subscribe(user => {
          console.log(user)
          this.userAuth0 = user;
          this.processarLogin(this.userAuth0);
        });
      } else {
        console.log('checkAuth falso')
        this.subAuth.next(false);
        //nada
      }
    })
  }

  processarLogin(usuAuth0){
    console.log('processando login')
    this.buscarUsuario(this.userAuth0.email)
      .subscribe((usuarioBanco: { msg: string, dadosUsuario: Usuario, valido: boolean }) => {
      if(!usuarioBanco.dadosUsuario && !usuarioBanco.valido){
        console.log('email inválido')
        //email não é da são judas
        // this.auth.logout();
      }else if(!usuarioBanco.dadosUsuario && usuarioBanco.valido){
        this.criarUsuario(usuAuth0).subscribe(result =>{
          this.estaLogado = true;
          this.usuarioLogado = {
            _id: result.dados._id,
            email: result.dados.email,
            nome: result.dados.nome,
            tipo: result.dados.tipo,
            materias: JSON.parse(result.dados.materias)
          }
          console.log('login processado')
          this.login(true);
        });
      }else if(usuarioBanco.dadosUsuario){
        this.estaLogado = true;
        this.usuarioLogado = usuarioBanco.dadosUsuario;
        console.log('login processado')
        this.login(true);
      }
    })
  }

  login(bool){
    this.subAuth.next(bool);
  }

  atualizarUsuario(usuario: Usuario) {
   return this.http.put<{msg: string, atualizado: boolean}>(BACKEND_URL, usuario);
    
  }

  entrarTurma(idTurma: string, usuario: Usuario) {
    usuario.materias.push(idTurma);
    return this.atualizarUsuario(usuario);
  }

  getSubAuth() {
    return this.subAuth.asObservable();
  }

  getUsuarioLogado() {
    return {...this.usuarioLogado};
  }

  getEstaLogado() {
    return this.estaLogado;
  }

  setEstaLogado(estaLogado: boolean) {
    this.estaLogado = estaLogado;
  }

  getUserAuth0(){
    return {...this.userAuth0};
  }
}