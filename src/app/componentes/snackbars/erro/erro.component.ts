import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  mensagem: string;
  tipo: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public dados) { }

  ngOnInit(): void {
    this.mensagem = this.dados.msg;
    this.tipo = this.dados.tipo;
  }

}
