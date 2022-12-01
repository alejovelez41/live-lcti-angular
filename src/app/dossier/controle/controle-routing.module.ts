import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividusComponent } from './individus/individus.component';
import { NavControleComponent } from './nav-controle/nav-controle.component';
import { SocietesComponent } from './societes/societes.component';

const routes: Routes = [
  {
    path: '',
    component: NavControleComponent,
    children: [
      {path: 'individus/:id', component: IndividusComponent},
      {path: 'societes/:id', component: SocietesComponent},
      {path: '**', redirectTo: 'individus'},
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleRoutingModule { }
