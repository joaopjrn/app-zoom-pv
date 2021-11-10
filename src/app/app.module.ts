import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ItemMateriaComponent } from './componentes/materia/item-materia/item-materia.component';
import { ListaDeMateriasComponent } from './componentes/materia/lista-de-materias/lista-de-materias.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BarraBotoesComponent } from './componentes/header/barra-botoes/barra-botoes.component';
import { DetalheMateriaComponent } from './componentes/materia/detalhe-materia/detalhe-materia.component';
import { AppRoutingModule } from './app-routing.module';
import { ListaAulasComponent } from './componentes/aula/lista-aulas/lista-aulas.component';
import { DetalheAulaComponent } from './componentes/aula/detalhe-aula/detalhe-aula.component';
import { CriarTurmaComponent } from './componentes/modais/criar-turma/criar-turma.component';
import { CriarAulaComponent } from './componentes/modais/criar-aula/criar-aula.component';
import { EntrarTurmaComponent } from './componentes/modais/entrar-turma/entrar-turma.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { BemVindoComponent } from './componentes/bem-vindo/bem-vindo.component';
import { CarregandoComponent } from './componentes/carregando/carregando.component';
import { ExcluirComponent } from './componentes/modais/excluir/excluir.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemMateriaComponent,
    ListaDeMateriasComponent,
    HeaderComponent,
    BarraBotoesComponent,
    DetalheMateriaComponent,
    ListaAulasComponent,
    DetalheAulaComponent,
    CriarTurmaComponent,
    CriarAulaComponent,
    EntrarTurmaComponent,
    BemVindoComponent,
    CarregandoComponent,
    ExcluirComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId
    }),
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
