import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './dossier/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuNavComponent } from './shared/menu-nav/menu-nav.component';
import { SupressionComponent } from './dossier/controle/individus/supression/supression.component';
import { RouterModule } from '@angular/router';
import { BoiteOutilsComponent } from './shared/boite-outils/boite-outils.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    BoiteOutilsComponent,
    SupressionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NoopAnimationsModule,
    MatSidenavModule
  ],
  exports: [
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
