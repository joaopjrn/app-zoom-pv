import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { AuthGuard } from "@auth0/auth0-angular";
import { BemVindoComponent } from "./bem-vindo/bem-vindo.component";
import { AuthGuard } from "./guard/auth.guard";
import { LogoutGuard } from "./guard/logout.guard";

import { DetalheMateriaComponent } from "./materia/detalhe-materia/detalhe-materia.component";
import { ListaDeMateriasComponent } from "./materia/lista-de-materias/lista-de-materias.component";


const routes: Routes = [
  { path: '', component: BemVindoComponent },
  { path: 'inicio', component: ListaDeMateriasComponent, canActivate: [AuthGuard] },
  { path: 'materia/:cod', component: DetalheMateriaComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
