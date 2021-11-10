import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulasService } from 'src/app/services/aulas.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dados: {item: {id: string, tipo: string}, titulo: string}, private materiaSvc: MateriasService, private aulaSvc: AulasService) { }

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
    }
  }

}
