import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-entrar-turma',
  templateUrl: './entrar-turma.component.html',
  styleUrls: ['./entrar-turma.component.css']
})
export class EntrarTurmaComponent implements OnInit {

  constructor(private materiaSvc: MateriasService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
  }

  entrarTurma(form: NgForm) {
    let codigo = form.value.codigo;
    this.materiaSvc.buscarMateria(codigo).subscribe(dados => {
      this.usuarioSvc.entrarTurma(dados.materiaEncontrada._id, this.usuarioSvc.getUsuarioLogado())
        .subscribe(res => {
          console.log(res);
        });
    })
  
  }
}
