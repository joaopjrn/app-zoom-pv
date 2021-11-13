import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { AulasService } from 'src/app/services/aulas.service';
import { MateriasService } from 'src/app/services/materias.service';

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
    private anotaSvc: AnotacoesServico) { }

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
      case 'anotacao':
        // this.anotaSvc.excluirAnotacao(this.dados.item.id);
        break;
    }
  }


}
