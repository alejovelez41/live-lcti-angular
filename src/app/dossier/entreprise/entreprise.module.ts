import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntrepriseRoutingModule } from './entreprise-routing.module';

import { SocieteComponent } from './societe/societe.component';
import { ExtractionComponent } from './extraction/extraction.component';
import { RecapIndividuComponent } from './recap-individu/recap-individu.component';
import { PdfControleComponent } from './pdf-controle/pdf-controle.component';






@NgModule({
  declarations: [
    SocieteComponent,
    ExtractionComponent,
    RecapIndividuComponent,
    PdfControleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EntrepriseRoutingModule,

  ]
})
export class EntrepriseModule { }
