import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { EntrepriseService } from 'src/app/dossier/services/entreprise.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';

@Component({
  selector: 'app-cloture-societe',
  templateUrl: './cloture-societe.component.html',
  styles: [
  ]
})
export class ClotureSocieteComponent implements OnInit {
  controle!: Controle;

  constructor( public activeModal: NgbActiveModal, private entrepriseService: EntrepriseService, private controleService: ControleService, private router: Router) { }
  entreprise!: Entreprise;

  cloturerEntreprise(){
    this.activeModal.close('cloture');
    this.router.navigate(['/controle/societes', this.controle.id])

  }

  ngOnInit(): void {
    this.controle = this.controleService.getControle();
    this.entreprise = this.entrepriseService.getDataEntreprise();
  }

}
