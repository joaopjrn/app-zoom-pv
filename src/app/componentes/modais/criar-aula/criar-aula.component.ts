import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aula } from 'src/app/models/aula.model';
import { AulasService } from 'src/app/services/aulas.service';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.component.html',
  styleUrls: ['./criar-aula.component.css']
})
export class CriarAulaComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  horario: string;
  filtroData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any, private aulaSvc: AulasService, private snackbar: MatSnackBar, private ref: MatDialogRef<CriarAulaComponent>) { }

  ngOnInit(): void {
    this.filtroData = (d: Date | null): boolean => {
      const dia = (d || new Date()).getDay();
      return this.dados.dias.includes(dia);
    };
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), 12,0)
    console.log(this.dados.idMateria);
    if (this.dados.editando) {
      let hora = this.dados.aula.data.getHours();
      let min = this.dados.aula.data.getMinutes();
      if(hora < 10) hora = '0' + hora;
      if(min < 10) min = '0' + min;
      this.horario = hora + ":" + min;
    }
  }
  salvarAula(form: NgForm) {
    if(form.invalid){
      return;
    }
    console.log(form.value)
    const nome = form.value.nome;
    const conteudo = form.value.conteudo;
    const data = new Date(form.value.data);
    const hora = form.value.hora.split(":");
    data.setHours(hora[0]);
    data.setMinutes(hora[1]);

    if(!this.dados.dias.includes(data.getDay())){
      this.snackbar.openFromComponent(ErroComponent, {data: {msg: 'Não é possível criar aula nesse dia!', tipo: 'aviso'}, duration: 2000})
      return;
    }

    if (this.dados.editando) {
      const aula: Aula= {
        _id: this.dados.aula._id,
        nome: nome,
        conteudo: conteudo,
        data: data,
        linkZoom: this.dados.aula.linkZoom,
        idMateria: this.dados.aula.idMateria
      }
      this.aulaSvc.alterarAula(aula);
      this.ref.close();
    } else {
      this.aulaSvc.novaAula(nome, this.dados.idMateria, conteudo, data.toISOString());
      this.ref.close();
    }
  }

}
