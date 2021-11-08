import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BemVindoComponent } from "./componentes/bem-vindo/bem-vindo.component";
import { CarregandoComponent } from "./componentes/carregando/carregando.component";
import { DetalheMateriaComponent } from "./componentes/materia/detalhe-materia/detalhe-materia.component";
import { ListaDeMateriasComponent } from "./componentes/materia/lista-de-materias/lista-de-materias.component";
// import { AuthGuard } from "@auth0/auth0-angular";

import { AuthGuard } from "./guard/auth.guard";
import { LogoutGuard } from "./guard/logout.guard";


const routes: Routes = [
  { path: '', component: CarregandoComponent },
  { path: 'bem-vindo', component: BemVindoComponent },
  { path: 'inicio', component: ListaDeMateriasComponent, canActivate: [AuthGuard] },
  { path: 'materia/:cod', component: DetalheMateriaComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
