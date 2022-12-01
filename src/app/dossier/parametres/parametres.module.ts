import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InspecteursComponent } from './inspecteurs/inspecteurs.component';
import { NavParametresComponent } from './nav-parametres/nav-parametres.component';
import { ParametresComponent } from './parametres/parametres.component';
import { ParametresRoutingModule } from './parametres-routing.module';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ModaleRetournerComponent } from './modale-retourner/modale-retourner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    ParametresComponent,
    InspecteursComponent,
    NavParametresComponent,
    PartenairesComponent,
    ModaleRetournerComponent
  ],
  imports: [
    ParametresRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ]
})
export class ParametresModule { }
