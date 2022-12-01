import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtractionComponent } from './extraction/extraction.component';
import { PdfControleComponent } from './pdf-controle/pdf-controle.component';
import { RecapIndividuComponent } from './recap-individu/recap-individu.component';
import { SocieteComponent } from './societe/societe.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'societe/:id', component: SocieteComponent},
      {path: 'extraction/:id', component: ExtractionComponent},
      {path: 'recapIndividu/:id', component: RecapIndividuComponent},
      {path: 'pdfControle/:id', component: PdfControleComponent},
      {path: '**', redirectTo: 'societe'},
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
