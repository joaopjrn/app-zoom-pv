import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
  selector: 'app-lista-aulas',
  templateUrl: './lista-aulas.component.html',
  styleUrls: ['./lista-aulas.component.css']
})
export class ListaAulasComponent implements OnInit {

  @Input() idMateria: string;
  listaAulas = [([] as Aula[]),([] as Aula[])];
  listaAulasListener: Subscription;
  constructor(private aulasSvc: AulasService) { }

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


}
