import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Anotacao } from 'src/app/models/anotacao.model';
import { Aula } from 'src/app/models/aula.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { AulasService } from 'src/app/services/aulas.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CriarAulaComponent } from '../../modais/criar-aula/criar-aula.component';
import { ExcluirComponent } from '../../modais/excluir/excluir.component';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-detalhe-aula',
  templateUrl: './detalhe-aula.component.html',
  styleUrls: ['./detalhe-aula.component.css'],
  // viewProviders: [MatExpansionPanel]
})
export class DetalheAulaComponent implements OnInit, OnDestroy {

  // editando: boolean = false;
  @Input() aula: Aula;
  @Input() aulaAnterior: boolean;

  linkGravacao: string;
  senhaGravacao: string;
  gravacaoCarregada: boolean = false;
  aberto: boolean = false;
  codAnotacao: string;

  // subAnotacaoBuscada: Subscription;

  constructor(private usuarioSvc: UsuarioService, public aulaSvc: AulasService, private modal: MatDialog, private matSvc: MateriasService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    // console.log(this.aula.idMeeting)
    this.codAnotacao = this.aula._id + this.usuarioSvc.getUsuarioLogado()._id;
  }

  abrindoPainel() {
    this.aberto = true;
  }

  excluirAula(){
    this.modal.open(ExcluirComponent, {data: {item: { id: this.aula._id, tipo: 'aula'}, titulo: 'Deseja excluir essa aula?'}})
  }

  // fechandoPainel(){
  //   this.editando = false;
  // }

  dataToString(data: Date) {
    let hora: string | number = data.getHours();
    let min: string | number = data.getMinutes();
    if (hora < 10) {
      hora = '0' + hora;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return data.toLocaleDateString() + ' - ' + hora + ":" + min;
  }

  editarAula() {
    this.modal.open(CriarAulaComponent, { data: { aula: this.aula, dias: JSON.parse(this.matSvc.getMateriaAtiva().diasSemana), editando:true} });
  }

  buscarGravacao(){
    this.aulaSvc.buscarLinkGravacao(this.aula.idMeeting).subscribe(resultado => {
      this.linkGravacao = resultado.dados.link;
      this.senhaGravacao = resultado.dados.senha;
      this.gravacaoCarregada = true;
    });
  }

  abrirLink(){
    window.open(this.linkGravacao, "_blank");
  }

  copiouSenha(){
    this.snackbar.openFromComponent(ErroComponent, {data: {msg: 'Senha copiada com sucesso!', tipo: 'sucesso'}, duration: 2000})
  }

  ngOnDestroy() {
    // if(this.subAnotacaoBuscada && !this.subAnotacaoBuscada.closed){
    //   this.subAnotacaoBuscada.unsubscribe();
    // }
  }

}
