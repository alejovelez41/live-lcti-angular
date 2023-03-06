import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { DataService } from 'src/app/dossier/services/data.service';
import { EntrepriseService } from 'src/app/dossier/services/entreprise.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';

@Component({
  selector: 'app-cloture-societe',
  templateUrl: './cloture-societe.component.html',
  styles: [
  ]
})
export class ClotureSocieteComponent implements OnInit {
  controle!: Controle;
  individus: Ind[] = [];
  individus_manquants : any[] = [];

  constructor( public activeModal: NgbActiveModal,
               private dataService: DataService, 
               private entrepriseService: EntrepriseService, 
               private controleService: ControleService, 
               private router: Router) { }
  entreprise!: Entreprise;

  cloturerEntreprise(){
    this.activeModal.close('cloture');
    this.router.navigate(['/controle/societes', this.controle.id])

  }
  alerteIndividus(){

  }

  filtrageIndividusControle(){
    console.log('FiltrageIndividus Called');
    this.dataService.getIndividus()
        .subscribe(individusService => {
          this.individus=[];
          this.individus_manquants=[];
          individusService.forEach(ind => {
            if (this.controle.individus_controle.includes(ind.id)) {
              this.individus.push(ind);
              if(ind.signature_cloture == "" && !ind.refus_signature ){
                this.individus_manquants.push(ind.nom.concat(' ', ind.prenom));
              }
            }
          });
          console.log('individus Function filtrage individus',this.individus);
        });

  }
  

  ngOnInit(): void {
    this.controle = this.controleService.getControle();
    this.entreprise = this.entrepriseService.getDataEntreprise();
    this.filtrageIndividusControle();
  }

}
