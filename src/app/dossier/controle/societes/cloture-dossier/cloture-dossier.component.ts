import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';

@Component({
  selector: 'app-cloture-dossier',
  templateUrl: './cloture-dossier.component.html',
  styles: [
  ]
})
export class ClotureDossierComponent implements OnInit {
  controle!: Controle;

  constructor(public activeModal: NgbActiveModal, private controleService: ControleService, private router: Router) { }

  cloturerDossier(){
    this.activeModal.close('clotureDossier');
    this.router.navigate(['dossiers/en-cours'])
  }

  ngOnInit(): void {
    
    this.controle = this.controleService.getControle();
  }

}
