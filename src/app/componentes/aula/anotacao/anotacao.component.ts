import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Anotacao } from 'src/app/models/anotacao.model';
import { AnotacoesServico } from 'src/app/services/anotacoes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService) { }

  salvarAnotacao(form: NgForm) {
    const anotacao = {
      codigo: this.cod,
      conteudo: form.value.conteudo
    }
    this.anotaSvc.criarAnotacao(anotacao);
  }

  ngOnInit(): void {
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
