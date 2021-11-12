import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aula } from 'src/app/models/aula.model';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.component.html',
  styleUrls: ['./criar-aula.component.css']
})
export class CriarAulaComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  horario: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any, private aulaSvc: AulasService) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), 12,0)
    console.log(this.dados.idMateria);
    if (this.dados.editando) {
      this.horario = this.dados.aula.data.getHours() + ":" + this.dados.aula.data.getMinutes();

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
    } else {
      this.aulaSvc.novaAula(nome, this.dados.idMateria, conteudo, data.toISOString());
    }
  }

}
