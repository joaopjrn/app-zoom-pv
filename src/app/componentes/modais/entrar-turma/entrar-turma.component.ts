import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-entrar-turma',
  templateUrl: './entrar-turma.component.html',
  styleUrls: ['./entrar-turma.component.css']
})
export class EntrarTurmaComponent implements OnInit {

  constructor(private materiaSvc: MateriasService, private usuarioSvc: UsuarioService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  entrarTurma(form: NgForm) {
    if(form.invalid){
      return;
    }
    let codigo = form.value.codigo;
    this.materiaSvc.buscarMateria(codigo).subscribe(dados => {
      if (dados.materiaEncontrada === null) {
        // alert('turma não encontrada')
        this.snackbar.openFromComponent(ErroComponent, {data: {mensagem: 'Turma não encontrada'}, duration: 2000});
      } else {
        this.usuarioSvc.entrarTurma(dados.materiaEncontrada._id, this.usuarioSvc.getUsuarioLogado()._id).subscribe(res => {
          if(res.atualizado){
            this.materiaSvc.inserirMateriaLocal(dados.materiaEncontrada)
          }else{
            this.snackbar.openFromComponent(ErroComponent, {data: {mensagem: 'Você já está cadastrado nessa turma!'}, duration: 2000});
          }
        })
        // .subscribe(usuarioAtualizado => {
        //   if(usuarioAtualizado.atualizado){
        //     this.materiaSvc.inserirMateriaLocal(dados.materiaEncontrada);
        //   }
        // }); 0P9P6I 6M9U0V
      }
    })

  }
}
