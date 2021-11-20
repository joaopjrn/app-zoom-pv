import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/mensagem.model';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.css']
})
export class ItemMensagemComponent implements OnInit {

  @Input() msg: Mensagem;
  @Input() idUsuarioLogado: string;
  horario: string;

  constructor() { }

  ngOnInit(): void {
    this.msg.createdAt = new Date(this.msg.createdAt)
  }

}
