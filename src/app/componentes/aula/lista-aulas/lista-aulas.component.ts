import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
    this.aulasSvc.buscarAulas(this.idMateria);
    this.listaAulasListener = this.aulasSvc.getSubAulasCarregadas().subscribe(aulasCarregadas => {
      if(aulasCarregadas){
        this.listaAulas = this.aulasSvc.getAulas();
      }
    });
  }

  dataToString(data: Date) {
    let hora: string | number = data.getHours();
    let min: string | number = data.getMinutes();
    if(hora < 10){
      hora = '0' + hora;
    }
    if(min < 10){
      min = '0' + min;
    }
    return data.toLocaleDateString() + ' - ' + hora + ":" + min;
  }

  buscarAnotacao(idAula: string) {
    if(!this.anotacoesBuscadas.includes(idAula)){
      console.log(idAula)
      this.anotacoesBuscadas.push(idAula);
      this.anotaSvc.buscarAnotacao(idAula, this.usuarioSvc.getUsuarioLogado()._id);
    }
  }

  ngOnDestroy(){
    this.listaAulasListener.unsubscribe();
  }


}
