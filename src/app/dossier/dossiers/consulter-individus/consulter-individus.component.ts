import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { ControleService } from '../../services/controle.service';
import { EntrepriseModule } from '../../entreprise/entreprise.module';
import { Ind } from 'src/app/shared/interfaces/individu.interface';

@Component({
  selector: 'app-consulter-individus',
  templateUrl: './consulter-individus.component.html',
  styles: [
  ]
})
export class ConsulterIndividusComponent implements OnInit {

  entreprises: Entreprise[] = [];
  individus: Ind[] = [];
  previewIndividus: Ind[] = [];

  entreprisePreview !: Entreprise;

  constructor(public activeModal: NgbActiveModal,
    private controleService: ControleService,
    private entrepriseService: EntrepriseService,
    private dataService: DataService) { }

  obtenirEntreprises() {
    console.log('ObtentionEntreprises Called');
    this.entreprises = this.controleService.getEntreprises();
  }

  obtenirIndividus() {
    console.log('ObtentionIndividus Called');
    this.individus = this.controleService.getIndividus();
  }

  filtrageIndividus(ent :Entreprise){
    this.previewIndividus=[];
    this.individus.forEach(ind => {
      if (ent.id_individus.includes(ind.id)) {
        this.previewIndividus.push(ind);
      }
    });
  }

  revenir(){
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.obtenirEntreprises();
    this.obtenirIndividus();
    this.entreprisePreview = this.controleService.getEntreprisePreview();
    this.filtrageIndividus(this.entreprisePreview);
  }

}
