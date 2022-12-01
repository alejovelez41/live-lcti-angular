import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspecteursComponent } from './inspecteurs/inspecteurs.component';
import { NavParametresComponent } from './nav-parametres/nav-parametres.component';
import { ParametresComponent } from './parametres/parametres.component';
const routes: Routes = [
  {
    path: '',
    component: NavParametresComponent,
    children: [
      {path: 'config', component: ParametresComponent},
      {path: 'edition/:id', component: ParametresComponent},
      {path: '**', redirectTo: 'config'},
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
