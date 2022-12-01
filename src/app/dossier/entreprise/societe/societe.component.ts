import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ControleService } from '../../services/controle.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styles: [
  ]
})

export class SocieteComponent implements OnInit {

  entreprise!: Entreprise;
  public IdInd: string | number = '';
  date: any;
  controle!: Controle;

  monFormulaire: FormGroup = this.fb.group({
    siren_fiche: ['', [Validators.required]],
    denomination: ['', [Validators.required]],
    adresse_siege: ['', [Validators.required]],
    dirigent: ['', [Validators.required]],
    date_dirigeant: ['', [Validators.required]],
    lieu_dirigeant: ['', [Validators.required]],
    notes_societe: ['', [Validators.required]],
  })


  constructor(private fb: FormBuilder,
    private statutIndividu: SharedStatutService,
    private entrepriseService: EntrepriseService,
    private activatedRoute: ActivatedRoute,
    private controleService: ControleService) { }

  changeVal() {
    this.entreprise.siren_fiche = this.monFormulaire.controls['siren_fiche'].value;
    this.entreprise.denomination = this.monFormulaire.controls['denomination'].value;
    this.entreprise.adresse_siege = this.monFormulaire.controls['adresse_siege'].value;
    this.entreprise.dirigent = this.monFormulaire.controls['dirigent'].value;
    this.entreprise.date_dirigeant = this.monFormulaire.controls['date_dirigeant'].value;
    this.entreprise.lieu_dirigeant = this.monFormulaire.controls['lieu_dirigeant'].value;
    this.entreprise.notes_societe = this.monFormulaire.controls['notes_societe'].value;

    // //MaJ dans le service
    this.entrepriseService.newData = this.entreprise;
  }
  enregistrerEnt(){}

  creerEnt() {
    
    this.changeVal();
    this.entreprise.date=this.date;

    this.entrepriseService.editerEntreprise(this.entreprise).
      subscribe(resp => {
        console.log('reponse Edit Entreprise', resp);

      });

    this.entrepriseService.resetEntreprise();
  }

  obtenirDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        (date.getDate()).toString().padStart(2, '0'),
      ].join('-')
    );
  }


  ngOnInit(): void {
    this.entreprise =  this.entrepriseService.getDataEntreprise();
    this.date = this.obtenirDate(new Date());
    this.controle = this.controleService.getControle();

    //MaJ le formulaire à partir des valeurs du service
    this.monFormulaire.controls['siren_fiche'].setValue(this.entreprise.siren_fiche);
    this.monFormulaire.controls['denomination'].setValue(this.entreprise.denomination);
    this.monFormulaire.controls['adresse_siege'].setValue(this.entreprise.adresse_siege);
    this.monFormulaire.controls['dirigent'].setValue(this.entreprise.dirigent);
    this.monFormulaire.controls['date_dirigeant'].setValue(this.entreprise.date_dirigeant);
    this.monFormulaire.controls['lieu_dirigeant'].setValue(this.entreprise.lieu_dirigeant);
    this.monFormulaire.controls['notes_societe'].setValue(this.entreprise.notes_societe);


    // this.activatedRoute.params
    //   .subscribe(({ id }) => this.entreprise.id = id)
    // console.log(this.activatedRoute.params)

    // this.entrepriseService.getEntrepriseById(this.entreprise.id).
    //   subscribe(entreprise => (
    //     this.entreprise = entreprise,
    //     //recuperer valeurs service
    //     console.log(this.entreprise),
    //     console.log(this.entreprise.denomination),
    //     this.changeVal()
    //   ));

  }

}
