import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { CriarTurmaComponent } from '../../modais/criar-turma/criar-turma.component';
import { EntrarTurmaComponent } from '../../modais/entrar-turma/entrar-turma.component';

@Component({
  selector: 'app-barra-botoes',
  templateUrl: './barra-botoes.component.html',
  styleUrls: ['./barra-botoes.component.css']
})
export class BarraBotoesComponent implements OnInit {

  constructor(public modal: MatDialog, public usuarioSvc: UsuarioService) { }

  usuarioLogado: Usuario;

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
  }

  criarTurma(){
    this.modal.open(CriarTurmaComponent);
  }

  entrarTurma(){
    this.modal.open(EntrarTurmaComponent);
  }

}
