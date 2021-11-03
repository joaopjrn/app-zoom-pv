import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.component.html',
  styleUrls: ['./criar-aula.component.css']
})
export class CriarAulaComponent implements OnInit {

  constructor(private aulaSvc: AulasService) { }

  ngOnInit(): void {
  }
  salvarAula(form: NgForm) {
    console.log(form.value)
    const nome = form.value.nome;
    const conteudo = form.value.conteudo;
    const data = form.value.data;
    const hora = form.value.hora;
    
    this.aulaSvc.novaAula(nome, "61809b8fa1050cdf6e1b05fc", conteudo, data, hora).subscribe(res => {
      console.log(res.aula)
    });
  }

}
