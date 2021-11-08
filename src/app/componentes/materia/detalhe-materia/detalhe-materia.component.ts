import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MateriasService } from 'src/app/services/materias.service';
import { CriarAulaComponent } from '../../modais/criar-aula/criar-aula.component';

@Component({
  selector: 'app-detalhe-materia',
  templateUrl: './detalhe-materia.component.html',
  styleUrls: ['./detalhe-materia.component.css']
})
export class DetalheMateriaComponent implements OnInit {
  materia: Materia;
  carregando = true;
  dias: {dia: string, val: number}[] = [
    {dia: 'Seg', val: 1},
    {dia: 'Ter', val: 2},
    {dia: 'Qua', val: 3},
    {dia: 'Qui', val: 4},
    {dia: 'Sex', val: 5},
    {dia: 'Sáb', val: 6},
    {dia: 'Dom', val: 0}
  ];
  diasDeAula: number[];

  usuario: Usuario  = {
    _id: 'ahsuhaushau',
    nome: 'Fulano Silva',
    email: 'fulano@email.com',
    tipo: 0,
    materias: ['61809b8fa1050cdf6e1b05fc','6180a80920ff081600872b24']
  }

  constructor(private modal: MatDialog, private route: ActivatedRoute, private matSvc: MateriasService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('cod')) {
        this.matSvc.buscarMateria(paramMap.get('cod')).subscribe((res: any) => {
          this.materia = res.materiaEncontrada;
          this.diasDeAula = JSON.parse(this.materia.diasSemana);
          console.log(this.materia)
          this.carregando = false;
        })
      }
    })
  }

  criarAula(){
    this.modal.open(CriarAulaComponent, {data: {idMateria: this.materia._id}});
  }
}
