import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { DataService } from '../../../services/data.service';
import { Ind } from '../../../../shared/interfaces/individu.interface';

@Component({
  selector: 'app-ajouter-individus',
  templateUrl: './ajouter-individus.component.html',
  styles: [
  ]
})
export class AjouterIndividusComponent implements OnInit {
  individus: Ind[] = [];
  individu!: Ind;
  controle!: Controle;


  route = '../AjouterIndividusComponent'
  monFormulaire: FormGroup = this.fb.group({
    nombreIndividus: [1, [Validators.required]],
  })

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private dataService : DataService, private controleService: ControleService) { }
  
  filtrageIndividusControle(){
    console.log('FiltrageIndividus Called');
    this.dataService.getIndividus()
        .subscribe(individusService => {
          this.individus=[];
          individusService.forEach(ind => {
            if (this.controle.individus_controle.includes(ind.id)) {
              this.individus.push(ind);
            }
          });
          console.log('individus Function filtrage individus',this.individus);
        });
  }

  ajouterIndividus(){
    const val = this.monFormulaire.controls['nombreIndividus'].value;

    for ( let i=0; i<val; i++) {
      this.dataService.ajouterIndividu(this.individu)
      .subscribe( async resp => {
        console.log('reponse individus ajouté modale AJ ind', resp, resp.id);
        this.controle.individus_controle.push(resp.id);
        this.controleService.setControle(this.controle);
      })
    }
    this.activeModal.close('success');
  }

  ngOnInit(): void {
    this.individu = this.dataService.getNewIndividu();
    this.controle = this.controleService.getControle();
    
  }

  

}
