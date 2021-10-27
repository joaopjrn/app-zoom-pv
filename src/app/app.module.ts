import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ItemMateriaComponent } from './materia/item-materia/item-materia.component';
import { ListaDeMateriasComponent } from './materia/lista-de-materias/lista-de-materias.component';
import { HeaderComponent } from './header/header.component';
import { BarraBotoesComponent } from './header/barra-botoes/barra-botoes.component';
import { DetalheMateriaComponent } from './materia/detalhe-materia/detalhe-materia.component';
import { AppRoutingModule } from './app-routing.module';
import { ListaAulasComponent } from './aula/lista-aulas/lista-aulas.component';
import { DetalheAulaComponent } from './aula/detalhe-aula/detalhe-aula.component';
import { CriarTurmaComponent } from './modais/criar-turma/criar-turma.component';
import { CriarAulaComponent } from './modais/criar-aula/criar-aula.component';
import { EntrarTurmaComponent } from './modais/entrar-turma/entrar-turma.component';

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
    EntrarTurmaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
