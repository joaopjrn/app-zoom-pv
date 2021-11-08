import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.component.html',
  styleUrls: ['./criar-aula.component.css']
})
export class CriarAulaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private dados: any, private aulaSvc: AulasService) { }

  ngOnInit(): void {
    console.log(this.dados.idMateria);
  }
  salvarAula(form: NgForm) {
    console.log(form.value)
    const nome = form.value.nome;
    const conteudo = form.value.conteudo;
    const data = new Date(form.value.data);
    const hora = form.value.hora.split(":");
    data.setHours(hora[0]);
    data.setMinutes(hora[1]);
    
    this.aulaSvc.novaAula(nome, this.dados.idMateria, conteudo, data.toISOString());
  }

}
