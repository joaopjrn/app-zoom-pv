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
  styleUrls: ['./detalhe-aula.component.css'],
  // viewProviders: [MatExpansionPanel]
})
export class DetalheAulaComponent implements OnInit, OnDestroy {

  editando: boolean = false;
  anotacao: Anotacao;
  anotacaoCarregada: boolean = false;
  @Input() aula: Aula;

  subAnotacaoBuscada: Subscription;

  constructor(private anotaSvc: AnotacoesServico, private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {

  }

  salvarAnotacao(form: NgForm) {
    const anotacao = {
      idAula: this.aula._id,
      idUsuario: this.usuarioSvc.getUsuarioLogado()._id,
      conteudo: form.value.conteudo
    }
    this.anotaSvc.criarAnotacao(anotacao);
  }

  buscarAnotacao() {
    if (!this.anotaSvc.anotacaoJaBuscada(this.aula._id)) {
      this.subAnotacaoBuscada = this.anotaSvc.getSubAnotacaoBuscada().subscribe((anotacaoRecebida: Anotacao) => {
        console.log('anotação recebida');
        console.log(anotacaoRecebida);
        this.anotacao = anotacaoRecebida;
        if(this.anotacao){
          this.anotacaoCarregada = true;
        }
        this.subAnotacaoBuscada.unsubscribe();
      });
      this.anotaSvc.buscarAnotacao(this.aula._id, this.usuarioSvc.getUsuarioLogado()._id);
    }else{
      console.log('anotação já foi buscada!')
    }
  }

  fechandoPainel(){
    this.editando = false;
  }

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

  ngOnDestroy() {
    if(this.subAnotacaoBuscada && !this.subAnotacaoBuscada.closed){
      this.subAnotacaoBuscada.unsubscribe();
    }
  }

}
