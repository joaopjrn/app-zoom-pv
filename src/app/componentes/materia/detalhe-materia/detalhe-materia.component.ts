import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Materia } from 'src/app/models/materia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CriarAulaComponent } from '../../modais/criar-aula/criar-aula.component';

@Component({
  selector: 'app-detalhe-materia',
  templateUrl: './detalhe-materia.component.html',
  styleUrls: ['./detalhe-materia.component.css']
})
export class DetalheMateriaComponent implements OnInit {
  usuarioLogado: Usuario;
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

  constructor(private modal: MatDialog, private route: ActivatedRoute, private matSvc: MateriasService, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioSvc.getUsuarioLogado();
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
    this.modal.open(CriarAulaComponent, {data: {idMateria: this.materia._id, editando: false}});
  }
}
