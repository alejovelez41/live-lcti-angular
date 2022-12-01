import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { DataService } from 'src/app/dossier/services/data.service';
import { EntrepriseService } from 'src/app/dossier/services/entreprise.service';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';

interface DataItem {
  titre: string;
  valeur: string;
}

@Component({
  selector: 'app-associer-entreprise',
  templateUrl: './associer-entreprise.component.html',
  styles: [
  ]
})
export class AssocierEntrepriseComponent implements OnInit {
  controle!: Controle;
  entreprise!: Entreprise;
  individu!: Ind;
  
  private id !: number | string;
  private denom !: number | string;

  entreprises: Entreprise[] = [];
  date: any;
  nouvelleEntreprise : boolean = false;

  public IdInd: string | number = '';
  public page_precedent: string = '';

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
              private entrepriseService: EntrepriseService, 
              private dataService: DataService, 
              public activeModal: NgbActiveModal,
              private controleService: ControleService) { }


  changeVal() {
    console.log('controls',this.monFormulaire.controls);
    this.entreprise.siren_fiche = this.monFormulaire.controls['siren_fiche'].value;
    this.entreprise.notes_societe = this.monFormulaire.controls['notes_societe'].value;
    this.entreprise.denomination = this.monFormulaire.controls['denomination'].value;
    this.entreprise.adresse_siege = this.monFormulaire.controls['adresse_siege'].value;
    this.entreprise.dirigent = this.monFormulaire.controls['dirigent'].value;
    this.entreprise.date_dirigeant = this.monFormulaire.controls['date_dirigeant'].value;
    this.entreprise.lieu_dirigeant = this.monFormulaire.controls['lieu_dirigeant'].value;

    // //MaJ dans le service
    this.entrepriseService.setEntreprise(this.entreprise);
    // this.entrepriseService.newData = this.entreprise;
  }

  filtrageEntreprisesControle(){
    console.log('FiltrageEntreprises Called');

    this.entrepriseService.getEntreprises()
      .subscribe(entreprisesService => {
        this.entrepriseService.setSocietes(entreprisesService);
        this.entreprises = [];
        entreprisesService.forEach(ent => {
          if (this.controle.entreprises_controle.includes(ent.id)) {
            this.entreprises.push(ent);}});
      });
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

  associerIndividu(ent: Entreprise){
    if (!ent.id_individus.includes(this.individu.id)){
      ent.id_individus.push(this.individu.id);
    }
    this.entreprise=ent;
  }
  ajouterEntreprise() {
    this.nouvelleEntreprise = true;
    this.entreprise = this.entrepriseService.getNouvelleEntreprise();
  }

  associerEntreprise(ent : Entreprise){
    console.log('Societe avant denvoyer', ent);
    
    this.associerIndividu(ent);
    this.entrepriseService.editerEntreprise(ent).
      subscribe(resp => {
        console.log('reponse Aso Entreprise', resp);
        
        this.activeModal.close(resp);
      });

    this.entrepriseService.resetEntreprise();
  }

  creerEntreprise(){
    // this.entreprise = this.entrepriseService.getNouvelleEntreprise();
    // console.log('Nouvelle entreprise -service', this.entreprise)
    // console.log('Nouvelle entreprise -creation', this.entreprise)
    this.changeVal();
    this.entreprise.date=this.date;
    this.associerIndividu(this.entreprise);
    this.entrepriseService.ajouterEntreprise(this.entreprise).
      subscribe(resp => {
        console.log('reponse AJ Entreprise creation', resp);
        this.controle.entreprises_controle.push(resp.id);
        this.controleService.setControle(this.controle);

        this.id = resp.id;
        this.denom = resp.denomination;
        console.log('Outside Tests 1', this.id, this.denom);
        const data = [true, this.id]; 
        console.log(data);
        this.activeModal.close(resp);
      });

    this.entrepriseService.resetEntreprise();
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.entreprise =  this.entrepriseService.getDataEntreprise();
    this.controle = this.controleService.getControle();

    this.date = this.obtenirDate(new Date());
    this.filtrageEntreprisesControle();
  }


}
