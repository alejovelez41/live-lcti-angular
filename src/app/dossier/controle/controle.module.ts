import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControleRoutingModule } from './controle-routing.module';

import { IndividusComponent } from './individus/individus.component';
import { SocietesComponent } from './societes/societes.component';
import { NavControleComponent } from './nav-controle/nav-controle.component';
import { AjouterIndividusComponent } from './individus/ajouter-individus/ajouter-individus.component';
import { SupressionSocieteComponent } from './societes/supression-societe/supression-societe.component';
import { ClotureSocieteComponent } from './societes/cloture-societe/cloture-societe.component';
import { ClotureDossierComponent } from './societes/cloture-dossier/cloture-dossier.component';




@NgModule({
  declarations: [
    IndividusComponent,
    SocietesComponent,
    NavControleComponent,
    AjouterIndividusComponent,
    SupressionSocieteComponent,
    ClotureSocieteComponent,
    ClotureDossierComponent
  ],
  imports: [
    CommonModule,
    ControleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ControleModule { }
