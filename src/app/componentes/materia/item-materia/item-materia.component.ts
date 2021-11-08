import { Component, Input, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';


@Component({
  selector: 'app-item-materia',
  templateUrl: './item-materia.component.html',
  styleUrls: ['./item-materia.component.css']
})
export class ItemMateriaComponent implements OnInit {
  @Input() materia: Materia;

  constructor() { }

  ngOnInit(): void {
  }

}
