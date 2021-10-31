import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-criar-turma',
  templateUrl: './criar-turma.component.html',
  styleUrls: ['./criar-turma.component.css']
})
export class CriarTurmaComponent implements OnInit {

  constructor(private materiaSvc: MateriasService) { }

  dias: {dia: string, check: boolean, val: number}[] = [
    {dia: 'Seg', check: false, val: 1},
    {dia: 'Ter', check: false, val: 2},
    {dia: 'Qua', check: false, val: 3},
    {dia: 'Qui', check: false, val: 4},
    {dia: 'Sex', check: false, val: 5},
    {dia: 'Sáb', check: false, val: 6},
    {dia: 'Dom', check: false, val: 0}
  ];

  ngOnInit(): void {
  }

  salvarMateria(form: NgForm){
    let diasSemana = [];
    for(let dia of this.dias){
      if(dia.check){
        diasSemana.push(dia.val);
      }
    }
    let diasSemanaStr = JSON.stringify(diasSemana);

    this.materiaSvc.novaMateria(form.value.nome, '123456', form.value.desc, 'https://i.ibb.co/L8PFq6C/materia.png', 'Professor Fulano', diasSemanaStr)
    .subscribe(res => {
      console.log(res)
    });
  }

}
