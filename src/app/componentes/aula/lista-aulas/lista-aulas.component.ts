import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { AulasService } from 'src/app/services/aulas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-aulas',
  templateUrl: './lista-aulas.component.html',
  styleUrls: ['./lista-aulas.component.css']
})
export class ListaAulasComponent implements OnInit, OnDestroy {

  @Input() idMateria: string;
  listaAulas = [([] as Aula[]),([] as Aula[])];
  listaAulasListener: Subscription;
  anotacoesBuscadas: string[] = [];
  constructor(private aulasSvc: AulasService, private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.aulasSvc.buscarAulas(this.idMateria, this.usuarioSvc.getUsuarioLogado().tipo);
    this.listaAulasListener = this.aulasSvc.getSubAulasCarregadas().subscribe(aulasCarregadas => {
      console.log('qualquer coisa');
      if (aulasCarregadas) {
        this.listaAulas = this.aulasSvc.getAulas();
      }
    });
  }

  ngOnDestroy(){
    this.listaAulasListener.unsubscribe();
  }

  troqueiTab(ev: MatTabChangeEvent){
    console.log(ev)
  }


}
