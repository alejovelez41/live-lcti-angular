import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Individu } from '../../../shared/interfaces/individus.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AjouterIndividusComponent } from './ajouter-individus/ajouter-individus.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { ControleService } from '../../services/controle.service';
import { Controle, Inspecteur } from '../../../shared/interfaces/controle.interface';
import { ActivatedRoute } from '@angular/router';
import { SupressionComponent } from './supression/supression.component';
import { Ind } from '../../../shared/interfaces/individu.interface';

@Component({
  selector: 'app-individus',
  templateUrl: './individus.component.html',
  styles: [`
    .container{
      background-color:#e0fdff42
    }
    .spacer {
      flex: 1 1 auto;
    }
  `
  ]
})
export class IndividusComponent implements OnInit {
  controle!: Controle;
  idControle!: any;

  individus: Ind[] = [];
  individu!: Ind;
  data_inspecteurs!:Inspecteur[];
  date: number = Date.now();
  monFormulaire: FormGroup = this.fb.group({
    nombreIndividus: [1, [Validators.required]],
  })


  constructor(private dataService: DataService,
    private statutIndividu: SharedStatutService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private controleService: ControleService,
    private activatedRoute: ActivatedRoute,) { }


  ajouterIndividus() {
    const val = this.monFormulaire.controls['nombreIndividus'].value;

    this.dataService.ajouterIndividu(this.dataService.getNewIndividu())
      .subscribe(resp => {
        console.log('reponse individus ajouté modale AJ ind', resp, resp.id);
        this.controle.individus_controle.push(resp.id);
        this.controleService.setControle(this.controle);

        this.controleService.editerControle(this.controle).subscribe(cont => {
          console.log('ajout du contrôle : ', cont);
          this.filtrageIndividusControle();
        });
        
      });
  }


  show() {
    console.log(this.individus)

  }

  setIndividu(individu : Ind){
    this.dataService.setIndividu(individu);
  }

  synchroData(ind: Individu) {
    this.statutIndividu.synchro(ind);
    console.log("Synchro de données...");
    console.log(ind);
  }

  modaleIndividus() {
    const modalRef = this.modalService.open(AjouterIndividusComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      if (data === 'success') {
        this.filtrageIndividusControle();
      }
    }, (reason) => {
      // on dismiss
    });
  }



  modaleSupression(id: string | number) {
    const modalRef = this.modalService.open(SupressionComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'oui') {

        this.dataService.effacerIndividu(id)
          .subscribe();
        console.log('deletion sucess');

        for (var i = 0; i < this.controle.individus_controle.length; i++) {
          if (this.controle.individus_controle[i] === id) {
            this.controle.individus_controle.splice(i, 1);
          }
        }
      } else if (data == 'non') {
        return
      };
      this.filtrageIndividusControle();
    }, (reason) => {
      // on dismiss
    });
  }

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

  ngOnInit(): void {

    this.individu = this.dataService.getNewIndividu();
    this.data_inspecteurs = this.controleService.getDataInspecteurs();

    console.log(this.activatedRoute.params)
    this.activatedRoute.params
      .subscribe(({ id }) => {
        console.log(id);
        this.idControle = id;
      });
    this.controle = this.controleService.getControle();

    if (this.idControle && this.idControle !== undefined) {
      console.log('se entro al if');
      this.individus = [];
      this.filtrageIndividusControle();
      
    }
  }




}
