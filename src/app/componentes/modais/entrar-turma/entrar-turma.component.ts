import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ChatService } from 'src/app/services/chat.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-entrar-turma',
  templateUrl: './entrar-turma.component.html',
  styleUrls: ['./entrar-turma.component.css']
})
export class EntrarTurmaComponent implements OnInit {

  usuarioLogado: Usuario;

  constructor(private materiaSvc: MateriasService, private usuarioSvc: UsuarioService, private snackbar: MatSnackBar, private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
  }

  entrarTurma(form: NgForm) {
    if(form.invalid){
      return;
    }
    let codigo = form.value.codigo;
    this.materiaSvc.buscarMateria(codigo).subscribe(dados => {
      if (dados.materiaEncontrada === null) {
        this.snackbar.openFromComponent(ErroComponent, {data: {msg: 'Turma não encontrada', tipo: 'aviso'}, duration: 2000});
      } else {
        this.usuarioSvc.entrarTurma(dados.materiaEncontrada._id, this.usuarioSvc.getUsuarioLogado()._id).subscribe(res => {
          console.log('após entrar turma')
          console.log(res)
          if(res.atualizado){
            this.materiaSvc.inserirMateriaLocal(dados.materiaEncontrada);
            this.snackbar.openFromComponent(ErroComponent, {data: {msg: res.msg, tipo: 'sucesso'}, duration: 2000});
            this.chatSvc.criarConversa(dados.materiaEncontrada.nomeProf, this.usuarioLogado._id, this.usuarioLogado.nome, dados.materiaEncontrada._id)
            .subscribe(resultado => {
              console.log('após tentar criar conversa')
              console.log(resultado)
            });
          }else{
            this.snackbar.openFromComponent(ErroComponent, {data: {msg: 'Você já está cadastrado nessa turma!', tipo: 'aviso'}, duration: 2000});
          }
        })
      }
    })

  }
}
