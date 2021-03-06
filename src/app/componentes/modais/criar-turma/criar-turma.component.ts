import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-turma',
  templateUrl: './criar-turma.component.html',
  styleUrls: ['./criar-turma.component.css']
})
export class CriarTurmaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any, private materiaSvc: MateriasService, private usuarioSvc: UsuarioService, private ref: MatDialogRef<CriarTurmaComponent>) { }

  dias: {dia: string, check: boolean, val: number}[] = [
    {dia: 'Seg', check: false, val: 1},
    {dia: 'Ter', check: false, val: 2},
    {dia: 'Qua', check: false, val: 3},
    {dia: 'Qui', check: false, val: 4},
    {dia: 'Sex', check: false, val: 5},
    {dia: 'Sáb', check: false, val: 6},
    {dia: 'Dom', check: false, val: 0}
  ];

  letras: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  ngOnInit(): void {
    console.log(this.dados)
    if(this.dados){
      const dias: number[] = JSON.parse(this.dados.materia.diasSemana);
      this.dias.forEach(dia => {
        if(dias.includes(dia.val)){
          dia.check = true;
        }
      })
    }
  }

  salvarMateria(form: NgForm){
    if(form.invalid){
      return;
    }
    let diasSemana = [];
    for(let dia of this.dias){
      if(dia.check){
        diasSemana.push(dia.val);
      }
    }
    let diasSemanaStr = JSON.stringify(diasSemana);

    let nome: string = form.value.nome;
    let desc: string = form.value.descricao;
    let linkImg: string = form.value.linkImg;
    let hue = this.getRandomIntInclusive(0,360);

    if(diasSemana.length > 0){
      if(this.dados){
        this.materiaSvc.alterarMateria(this.dados.materia._id, nome, this.dados.materia.codMateria, desc, linkImg, this.dados.materia.hue, this.dados.materia.nomeProf, diasSemanaStr)
        this.ref.close();
      }else{
        this.materiaSvc.novaMateria(nome, this.gerarCodMateria(), desc, linkImg, hue, this.usuarioSvc.getUsuarioLogado().nome, diasSemanaStr);
        this.ref.close();
      }
    }else{
      return;
    }
  }

  gerarCodMateria(){
    let cod = '';
    for(let i = 0; i < 3; i++){
      cod+= this.getRandomIntInclusive(0,9);
      cod+= this.letras[this.getRandomIntInclusive(0, this.letras.length-1)]
    }
    console.log(cod);
    return cod;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
