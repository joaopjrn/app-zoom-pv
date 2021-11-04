import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario.model";

const BACKEND_URL = environment.apiUrl + '/usuario/';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private usuarioLogado: Usuario;
  private estaLogado: boolean = false;

  constructor(private http: HttpClient){}

  buscarUsuario(email: string){
    return this.http.get<{msg: string, dadosUsuario: Usuario, valido: any}>(BACKEND_URL + email);
  }

  criarUsuario(dadosUsuario: {nome: string, email: string, tipo: number, materias: string}){
    this.http.post(BACKEND_URL, dadosUsuario).subscribe(result => {
      console.log(result);
    });
  }

  setUsuarioLogado(usuarioLogado){
    this.usuarioLogado = usuarioLogado;
  }

  getUsuarioLogado(){
    return this.usuarioLogado;
  }

  getEstaLogado(){
    return this.estaLogado;
  }

  setEstaLogado(estaLogado: boolean){
    this.estaLogado = estaLogado;
  }
}
