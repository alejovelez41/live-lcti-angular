import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationsComponent } from './informations/informations.component';
import { NavOutilsComponent } from './nav-outils/nav-outils.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: NavOutilsComponent,
    children: [
      {path: 'notes', component: NotesComponent},
      {path: 'informations', component: InformationsComponent},
      {path: '**', redirectTo: 'notes'},
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutilsRoutingModule { }
