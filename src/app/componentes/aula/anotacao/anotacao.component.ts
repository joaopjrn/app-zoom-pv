import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Anotacao } from 'src/app/models/anotacao.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ExcluirComponent } from '../../modais/excluir/excluir.component';
import { ErroComponent } from '../../snackbars/erro/erro.component';

@Component({
  selector: 'app-anotacao',
  templateUrl: './anotacao.component.html',
  styleUrls: ['./anotacao.component.css']
})
export class AnotacaoComponent implements OnInit {

  editando: boolean = false;
  anotacao: Anotacao;
  anotacaoCarregada: boolean = false;
  @Input() cod: string;

  subAnotacaoBuscada: Subscription;

  constructor(private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService, private snackbar: MatSnackBar, private modal: MatDialog) { }

  salvarAnotacao(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (!this.anotacaoCarregada) { //criando nova anotação
      const anotacao = {
        codigo: this.cod,
        conteudo: form.value.conteudo
      }
      this.anotaSvc.criarAnotacao(anotacao).subscribe((res: { msg: string, anotacao: Anotacao }) => {
        if (res.anotacao) {
          console.log(res.anotacao.conteudo)
          this.anotacao = res.anotacao;
          this.editando = false;
          this.anotacaoCarregada = true;
          this.snackbar.openFromComponent(ErroComponent, { data: { msg: res.msg, tipo: 'sucesso' }, duration: 2000 });
        }
      });
    } else { //editando anotação existente
      const anotacao = {
        _id: this.anotacao._id,
        codigo: this.cod,
        conteudo: form.value.conteudo
      }
      this.anotaSvc.alterarAnotacao(anotacao).subscribe((res: { msg: string, alterada: boolean }) => {
        if (res.alterada) {
          this.anotacao = anotacao;
          this.editando = false;
          this.snackbar.openFromComponent(ErroComponent, { data: { msg: res.msg, tipo: 'sucesso' }, duration: 2000 });
        }
      });
    }
  }

  excluirAnotacao() {
    const modalRef = this.modal.open(ExcluirComponent, { data: { item: { id: this.anotacao._id, tipo: 'anotacao' }, titulo: 'Deseja excluir essa anotação?' } });
    modalRef.afterClosed().subscribe(res => {
      console.log(res)
      if (res) {
        this.anotaSvc.excluirAnotacao(this.anotacao._id).subscribe((res: { msg: string, dados: { deletedCount: number } }) => {
          if(res.dados.deletedCount > 0){
            this.editando = false;
            this.anotacaoCarregada = false;
            this.anotacao = null;
            this.snackbar.openFromComponent(ErroComponent, { data: { msg: res.msg, tipo: 'sucesso' }, duration: 2000 });
          }
        });
      }
    })
  }

  ngOnInit(): void {
    console.log(this.anotacao)
    console.log(this.cod)
    console.log('anotacao oninit')
    if (!this.anotaSvc.anotacaoJaBuscada(this.cod)) {
      this.subAnotacaoBuscada = this.anotaSvc.getSubAnotacaoBuscada().subscribe((anotacaoRecebida: Anotacao) => {
        console.log('anotação recebida');
        console.log(anotacaoRecebida);
        this.anotacao = anotacaoRecebida;
        if (this.anotacao) {
          this.anotacaoCarregada = true;
        }
        this.subAnotacaoBuscada.unsubscribe();
      });
      this.anotaSvc.buscarAnotacao(this.cod);
    } else {
      console.log('anotação já foi buscada!')
    }
  }


}
