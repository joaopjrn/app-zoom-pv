import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@auth0/auth0-angular";
import { User } from "@auth0/auth0-spa-js";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ErroComponent } from "../componentes/snackbars/erro/erro.component";
import { Usuario } from "../models/usuario.model";

const BACKEND_URL = environment.apiUrl + '/usuario/';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private http: HttpClient, private auth: AuthService, private snackbar: MatSnackBar) { }

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
          // this.setLogado(true);
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
          this.setLogado(true);
          // this.subDadosCarregados.next(true);
        } else if (!usuarioBanco.dadosUsuario && usuarioBanco.valido) {
          //se usuario não existe no banco e o email é válido, cria usuario novo
          this.criarUsuario(this.userAuth0);
        }
        else if (!usuarioBanco.dadosUsuario && !usuarioBanco.valido) {
          //email não é da são judas
          console.log('email inválido')
          this.setLogado(false);
          this.snackbar.openFromComponent(ErroComponent, {data:{msg: 'E-mail inválido! Utilize um e-mail da São Judas', tipo: 'aviso'}, duration: 3000,  })
          setTimeout(() => {
            this.auth.logout();
          }, 2900);
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
      this.setLogado(true);
    });;
  }

  atualizarUsuario(usuario: Usuario) {
    return this.http.put<{ msg: string, atualizado: boolean }>(BACKEND_URL, usuario);
  }

  entrarTurma(idTurma: string, idUsuario: string) {
    return this.http.put<{msg: string, atualizado: boolean}>(BACKEND_URL, {idUsuario: idUsuario, idMateria: idTurma, entrar: true});
    // usuario.materias.push(idTurma);
    // return this.atualizarUsuario(usuario);
  }

  sairTurma(idTurma: string, idUsuario: string){
    return this.http.put(BACKEND_URL, {idMateria: idTurma, idUsuario: idUsuario, entrar: false});
  }

  setMaterias(materias: string[]){
    this.usuarioLogado.materias = materias;
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
