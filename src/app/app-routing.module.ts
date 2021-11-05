import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BemVindoComponent } from "./bem-vindo/bem-vindo.component";
import { DetalheMateriaComponent } from "./materia/detalhe-materia/detalhe-materia.component";
import { ListaDeMateriasComponent } from "./materia/lista-de-materias/lista-de-materias.component";


const routes: Routes = [
  { path: '', component: BemVindoComponent },
  { path: 'inicio', component: ListaDeMateriasComponent },
  { path: 'materia/:cod', component: DetalheMateriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
