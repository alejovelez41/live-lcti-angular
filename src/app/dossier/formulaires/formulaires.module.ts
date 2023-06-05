import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RouterModule } from '@angular/router';

import { FormulairesRoutingModule } from './formulaires-routing.module';


import { AutresComponent } from './autres/autres.component';
import { ClotureComponent } from './cloture/cloture.component';
import { ConsentementComponent } from './description/consentement/consentement.component';
import { DescriptionComponent } from './description/description.component';
import { IdentiteComponent } from './identite/identite.component';
import { RemunerationComponent } from './remuneration/remuneration.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SignatureComponent } from './signature/signature.component';
import { StatutComponent } from './statut/statut.component';
import { AssocierEntrepriseComponent } from './statut/associer-entreprise/associer-entreprise.component';
import { JoursComponent } from './autres/jours/jours.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    SidemenuComponent,
    IdentiteComponent,
    StatutComponent,
    AutresComponent,
    DescriptionComponent,
    RemunerationComponent,
    ConsentementComponent,
    SignatureComponent,
    ClotureComponent,
    AssocierEntrepriseComponent,
    JoursComponent,

  ],
  imports: [
    CommonModule,
    FormulairesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    RouterModule,
    NgbModule,
    MatSidenavModule
  ]

})
export class FormulairesModule { }
