import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivesComponent } from './archives/archives.component';
import { EnCoursComponent } from './en-cours/en-cours.component';

import { NavDossiersComponent } from './nav-dossiers/nav-dossiers.component';


const routes: Routes = [
  {
    path: '',
    component: NavDossiersComponent,
    children: [
      {path: 'en-cours', component: EnCoursComponent},   
      {path: 'archives', component: ArchivesComponent},
      {path: '**', redirectTo: 'en-cours'},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossiersRoutingModule { }
