import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DossiersRoutingModule } from './dossiers-routing.module';

import { EnCoursComponent } from './en-cours/en-cours.component';
import { ArchivesComponent } from './archives/archives.component';
import { NavDossiersComponent } from './nav-dossiers/nav-dossiers.component';
import { SupressionControleComponent } from './supression-controle/supression-controle.component';
import { ConsulterIndividusComponent } from './consulter-individus/consulter-individus.component';
import { ArchivageEventComponent } from './archivage-event/archivage-event.component';






@NgModule({
  declarations: [
    EnCoursComponent,
    ArchivesComponent,
    NavDossiersComponent,
    SupressionControleComponent,
    ConsulterIndividusComponent,
    ArchivageEventComponent
  ],
  imports: [
    CommonModule,
    DossiersRoutingModule,
    RouterModule,
    NgbModule
  ]
})
export class DossiersModule { }
