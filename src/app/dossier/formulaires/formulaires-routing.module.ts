import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutresComponent } from './autres/autres.component';
import { ClotureComponent } from './cloture/cloture.component';
import { DescriptionComponent } from './description/description.component';
import { IdentiteComponent } from './identite/identite.component';
import { RemunerationComponent } from './remuneration/remuneration.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SignatureComponent } from './signature/signature.component';
import { StatutComponent } from './statut/statut.component';

const routes: Routes = [
  {
    path: '',
    component: SidemenuComponent,
    children: [
      {path: 'autres/:id', component: AutresComponent},   
      {path: 'cloture/:id', component: ClotureComponent},
      {path: 'description/:id', component: DescriptionComponent},
      {path: 'identite/:id', component: IdentiteComponent},
      {path: 'remuneration/:id', component: RemunerationComponent},
      {path: 'statut/:id', component: StatutComponent},
      {path: '**', redirectTo: 'description/:id'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulairesRoutingModule { }
