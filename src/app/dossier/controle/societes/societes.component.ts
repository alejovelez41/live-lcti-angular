import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { Controle } from '../../../shared/interfaces/controle.interface';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { SharedStatutService } from '../../shared-statut.service';
import { ClotureDossierComponent } from './cloture-dossier/cloture-dossier.component';
import { ClotureSocieteComponent } from './cloture-societe/cloture-societe.component';
import { SupressionSocieteComponent } from './supression-societe/supression-societe.component';

@Component({
  selector: 'app-societes',
  templateUrl: './societes.component.html',
  styles: [
  ]
})
export class SocietesComponent implements OnInit {
  controle!: Controle;
  idControle!: any;
  entreprises: Entreprise[] = [];
  individus: Ind[] = [];
  date: number = Date.now();
  entreprise!: Entreprise;
  sep: string = ',';

  constructor(private entrepriseService: EntrepriseService,
    private dataService: DataService,
    private statutIndividu: SharedStatutService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private controleService: ControleService,
    private activatedRoute: ActivatedRoute,) { }

  ajouterEntreprise() {
    // const val = this.monFormulaire.controls['nombreIndividus'].value;

    // for (let i = 0; i < val; i++) {
    //   this.dataService.ajouterIndividu(this.individu)
    //     .subscribe(resp => {
    //       console.log('reponse', resp);
    //     });
    // };
    this.entreprise = this.entrepriseService.getNouvelleEntreprise();

    this.entrepriseService.ajouterEntreprise(this.entreprise)
      .subscribe(resp => {
        console.log('reponse AJ Entreprise autre ajout', resp);
        this.controle.entreprises_controle.push(resp.id);
        this.controleService.setControle(this.controle);

        this.controleService.editerControle(this.controle).subscribe(cont => {
          console.log('ajout du contrôle : ', cont);
          this.filtrageEntreprisesControle();
        });

        
      });


  }

  modaleCloture(ent: Entreprise) {
    this.entrepriseService.setEntreprise(ent);
    const modalRef = this.modalService.open(ClotureSocieteComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'cloture') {
        ent.archive = true;

        this.entrepriseService.editerEntreprise(ent).
          subscribe(resp => {
            console.log('Entreprise edité', resp);
            let clotureDossier = true;
            this.entrepriseService.getEntreprises()
              .subscribe(societes => {
                this.entrepriseService.setSocietes(societes);
                this.entreprises = [];
                
                societes.forEach(soc => {
                  if (this.controle.entreprises_controle.includes(soc.id)) {
                    this.entreprises.push(soc);
                    if (!soc.archive){
                      console.log('se encontro una ent no archivada');
                      clotureDossier = false;

                    }
                  }

                });
                if (clotureDossier){
                  this.modaleClotureDossier();
                }
              });
              
              

          });
      }
    });
  }

  modaleClotureDossier() {
    const modalRef = this.modalService.open(ClotureDossierComponent, { size: 'lg' });
    
    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'clotureDossier') {
        this.controle.etat = "complete";
        this.controleService.editerControle(this.controle)
        .subscribe(resp => {
          console.log('controle', resp);
          this.controleService.setControle(resp);
        });
      }
    });
  }

  modaleIndividus() { }
  modaleSupression(id: number | string) {
    const modalRef = this.modalService.open(SupressionSocieteComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'oui') {

        this.entrepriseService.effacerEntreprise(id)
          .subscribe();
        console.log('deletion sucess');




      } else if (data == 'non') {
        return
      };
      this.filtrageEntreprisesControle();
    }, (reason) => {
      // on dismiss
    });

  }

  filtrageEntreprisesControle() {
    console.log('FiltrageEntreprises Called');

    this.entrepriseService.getEntreprises()
      .subscribe(entreprisesService => {
        this.entrepriseService.setSocietes(entreprisesService);
        this.entreprises = [];
        entreprisesService.forEach(ent => {
          if (this.controle.entreprises_controle.includes(ent.id)) {
            this.entreprises.push(ent);
          }
        });
      });
  }

  filtrageIndividusControle() {
    console.log('FiltrageIndividus Called');
    this.dataService.getIndividus()
      .subscribe(individusService => {
        this.individus = [];
        individusService.forEach(ind => {
          if (this.controle.individus_controle.includes(ind.id)) {
            this.individus.push(ind);
          }
        });
        console.log('individus Function filtrage individus', this.individus);
      });

  }

  setEntreprise(entreprise : Entreprise){
    this.entrepriseService.setEntreprise(entreprise);
  }



  ngOnInit(): void {
    this.entreprise = this.entrepriseService.getDataEntreprise();
    // ------

    // console.log(this.activatedRoute.params)
    // this.activatedRoute.params
    //   .subscribe(({ id }) => {
    //     console.log(id);
    //     this.idControle = id;
    //   });
    this.controle = this.controleService.getControle();

    this.filtrageEntreprisesControle();
    this.filtrageIndividusControle();

    console.log('Entreprises obtenues en sortie', this.entreprises)

    // console.log('controle API', this.controle);
    // this.controleService.getControleById(this.idControle).
    //   subscribe(resp => {
    //     this.controle=resp;

    //     if(this.idControle && this.idControle!== undefined){
    //       console.log('se entro al if');
    //       this.entrepriseService.getEntreprises()
    //       .subscribe(entreprisesService => {
    //         console.log('recieved entreprises', entreprisesService);
    //         console.log('current controle', this.controle);
    //         entreprisesService.forEach(ent => {
    //           // console.log('Tests individu avec id : ', ind.id);
    //           // console.log(this.controle.individus_controle, this.controle.individus_controle.includes(ind.id))
    //           if(this.controle.entreprises_controle.includes(ent.id)){
    //             this.entreprises.push(ent);
    //             // console.log('Pushed inside pour', ind.id);
    //             // console.log('current array', this.individus);
    //           }

    //         });
    //         // this.individus = individusService;
    //         console.log(this.entreprises)
    //       });
    //     }


    //   });


    // ------
    // this.entrepriseService.getEntreprises()
    //   .subscribe(entreprises => {
    //     this.entreprises = entreprises;
    //     console.log(this.entreprises)
    //   });
  }

}
