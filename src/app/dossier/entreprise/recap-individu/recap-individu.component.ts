import { Component, OnInit } from '@angular/core';

import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';

@Component({
  selector: 'app-recap-individu',
  templateUrl: './recap-individu.component.html',
  styles: [
  ]
})
export class RecapIndividuComponent implements OnInit {
  individu!: Ind;
  entreprise!: Entreprise;
  entreprises: Entreprise[] = [];
  controle!: Controle;

  routeRetour !: string;
  idRetour!: string|number;

  constructor(
    private entrepriseService: EntrepriseService, 
    private dataService: DataService,
    private controleService: ControleService) { }
  

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.entreprises =  this.entrepriseService.getSocietes();
    this.entreprise =  this.entrepriseService.sociteById(this.individu.idEnt);
    this.controle = this.controleService.getControle();

    this.routeRetour = '/formulaires/description';
    this.idRetour = this.individu.id;

    if(this.individu.signature_cloture!=''){
      this.routeRetour = '/controle/individus';
      this.idRetour = this.controle.id;
    }
  }

}
