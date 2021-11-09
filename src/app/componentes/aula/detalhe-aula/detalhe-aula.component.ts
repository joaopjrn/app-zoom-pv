import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Anotacao } from 'src/app/models/anotacao.model';
import { Aula } from 'src/app/models/aula.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalhe-aula',
  templateUrl: './detalhe-aula.component.html',
  styleUrls: ['./detalhe-aula.component.css']
})
export class DetalheAulaComponent implements OnInit, OnDestroy {

  editando: boolean = false;
  anotacao: Anotacao;
  @Input() aula: Aula;

  subAnotacaoBuscada: Subscription;

  constructor(private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.subAnotacaoBuscada = this.anotaSvc.getSubAnotacaoBuscada().subscribe((anotacaoRecebida: Anotacao) => {
      console.log('anotação recebida')
      console.log(anotacaoRecebida)
      this.anotacao = anotacaoRecebida;
    });

  }

  salvarAnotacao(form: NgForm){
    const anotacao = {
      idAula: this.aula._id,
      idUsuario: this.usuarioSvc.getUsuarioLogado()._id,
      conteudo: form.value.anotacao
    }
    this.anotaSvc.criarAnotacao(anotacao);
  }

  ngOnDestroy(){
    this.subAnotacaoBuscada.unsubscribe();
  }

}
