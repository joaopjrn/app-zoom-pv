import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit {

  constructor(private usuarioSvc: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if(this.usuarioSvc.getEstaLogado()){
      this.router.navigate(['inicio']);
    }
  }

}
