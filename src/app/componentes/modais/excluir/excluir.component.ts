import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { AulasService } from 'src/app/services/aulas.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private materiaSvc: MateriasService,
    private aulaSvc: AulasService,
    private anotaSvc: AnotacoesServico,
    private usuarioSvc: UsuarioService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  confirmarExcluir(){
    switch (this.dados.item.tipo) {
      case 'materia':
        this.materiaSvc.excluirMateria(this.dados.item.id);
        break;
      case 'aula':
        this.aulaSvc.excluirAula(this.dados.item.id);
        break;
      case 'sair':
        this.usuarioSvc.sairTurma(this.dados.item.idMateria, this.usuarioSvc.getUsuarioLogado()._id).subscribe(res => {
          const materiasAtualizadas = this.usuarioSvc.getUsuarioLogado().materias.filter(materia => this.dados.item.idMateria != materia)
          this.usuarioSvc.setMaterias(materiasAtualizadas);
          this.materiaSvc.removerMateriaLocal(this.dados.item.idMateria);
          this.snackbar.openFromComponent(ErroComponent, {data:{msg: 'Você saiu da turma com sucesso!', tipo: 'sucesso'}, duration: 3000,  })
        });
        break;
      case 'anotacao':
        // this.anotaSvc.excluirAnotacao(this.dados.item.id);
        break;
    }
  }


}
