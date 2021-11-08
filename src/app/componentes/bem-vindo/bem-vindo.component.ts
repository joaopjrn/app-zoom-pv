import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit, OnDestroy {

  private subDadosCarregados: Subscription;

  constructor(private usuarioSvc: UsuarioService, private router: Router) { }
  
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subDadosCarregados.unsubscribe();
    // this.subEstaLogado.unsubscribe();
  }

}
