import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaLogado: boolean = false;
  usuario;

  constructor(public auth: AuthService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(logado => {
      this.estaLogado = logado;
      if(this.estaLogado){
        this.auth.user$.subscribe(dadosUsuario => {
          this.usuario = dadosUsuario;
          this.usuarioSvc.buscarUsuario(this.usuario.email).subscribe(dadosUsuario => {
            console.log(dadosUsuario.dadosUsuario)
            if(dadosUsuario.dadosUsuario && dadosUsuario.valido){
              this.usuarioSvc.setUsuarioLogado(dadosUsuario.dadosUsuario);
            }else if(!dadosUsuario.valido){
              alert('E-mail Inválido!')
              this.auth.logout({returnTo:'http://localhost:4200'});
            }else if(!dadosUsuario.dadosUsuario){
              let novoUsuario = {
                nome: this.usuario.name,
                email: this.usuario.email,
                tipo: null,
                materias: JSON.stringify([])
              }
              this.usuarioSvc.criarUsuario(novoUsuario);
            }
          });
        });
      }
    });
  }

}
