import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssocierEntrepriseComponent } from './associer-entreprise/associer-entreprise.component';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { EntrepriseService } from '../../services/entreprise.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';


interface DataItem{
  titre: string;
  valeur: any;
}

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styles: [
  ]
})
export class StatutComponent implements OnInit {

  individu!: Ind;
  entreprise!: Entreprise;
  controle!: Controle;
  date!:any;
  entreprises: Entreprise[] = [];

  idIndividu !: string|number;
  dataIndividu: DataItem[] = []; 

  idEnt: string| number= '';
  denominationEnt: string = '';

  public statInd : string = '';
  routeEntite : string = './formulaires/fiche-entite';
  routeCloture : string = './formulaires/cloture';
  routeEtablissement : string = './etablissement';
  

  monFormulaire: FormGroup = this.fb.group({
    
    statut: [ '', [ Validators.required]],
    fonction: [ '', [ Validators.required]],
    nir: [ '', [ Validators.required, Validators.minLength(13), Validators.maxLength(13) ]],
    siret: [ '', [ Validators.required, Validators.minLength(14), Validators.maxLength(14) ]],
    siren: [ '', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
   
  })
  
  constructor( public statutIndividu: SharedStatutService, 
               private fb: FormBuilder, 
               private router :  Router, 
               private modalService: NgbModal, 
               private dataService : DataService,
               private entrepriseService: EntrepriseService,
               private controleService: ControleService) {}

  ouvrirModal() {
    const modalRef = this.modalService.open(AssocierEntrepriseComponent, { size: 'xl' });
    console.log('resultado modal ref', modalRef.result);
    modalRef.result.then((data) => {
      // console.log('result obtained', data);
      // console.log('data 1: ', data[0], 'data 2: ', data[2], 'data 3: ', data[3]);
      console.log('data : ', data);
      if (data && data === 'Cross click') {
        console.log('Obtained Data :', data);
        return
      } else if (data){
        this.entreprise = data;
        this.entrepriseService.setEntreprise(this.entreprise);
        console.log('result', data);
        this.individu.idEnt = this.entreprise.id;
        this.individu.denominationEnt = this.entreprise.denomination;
        this.individu.siren_fiche = this.entreprise.siren_fiche;
        this.individu.adresse_siege = this.entreprise.adresse_siege;
        this.filtrageEntreprisesControle();
        // this.statutIndividu.dataIndividu[116].valeur= this.entreprise.id;
        // this.statutIndividu.dataIndividu[117].valeur= this.entreprise.denomination;
        // this.statutIndividu.dataIndividu[118].valeur= this.entreprise.siren_fiche;
        // this.statutIndividu.dataIndividu[119].valeur= this.entreprise.adresse_siege;
        // this.statutIndividu.dataIndividu[120].valeur= this.entreprise.denominationI;
        // this.statutIndividu.dataIndividu[121].valeur= this.entreprise.adresse_siegeI;
        

        return
      } else{
        return
      };
      // this.entrepriseService.getEntreprises()
      // .subscribe(entreprises => {
      //   this.entreprises = entreprises;
      //   console.log(this.entreprises)
      });

    this.statutIndividu.newData = this.dataIndividu
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

  changeStatut(){    
    this.individu.statut = this.monFormulaire.controls['statut'].value;
    
    if (this.individu.statut == 'salarie') {
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].disable();
      this.monFormulaire.controls['siren'].disable();
    }
    else if ((this.individu.statut == 'ti') || (this.individu.statut == 'me')){
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].enable();
      this.monFormulaire.controls['siren'].enable();
    }
    else if ((this.individu.statut == 'autre')){
      this.monFormulaire.controls['fonction'].enable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].enable();
      this.monFormulaire.controls['siren'].enable();
    }
    else {
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].disable();
      this.monFormulaire.controls['siret'].disable();
      this.monFormulaire.controls['siren'].disable();
    }

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );
  }
  

  changeVal(){
    this.individu.fonction = this.monFormulaire.controls['fonction'].value;
    this.individu.nir = this.monFormulaire.controls['nir'].value;
    this.individu.siret = this.monFormulaire.controls['siret'].value;
    this.individu.siren = this.monFormulaire.controls['siren'].value;
    // MaJ valeurs ID entreprise
    // this.individu.idEnt = this.entreprise.id;
    // this.individu.denominationEnt = this.entreprise.denomination;
    // this.individu.siren_fiche = this.entreprise.siren_fiche;
    // this.individu.adresse_siege = this.entreprise.adresse_siege;

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );
  }

  changeSiret(){
    this.monFormulaire.controls['siret'].invalid ? '' : this.monFormulaire.controls['siren'].setValue((this.monFormulaire.controls['siret'].value).slice(0,9));

    this.changeVal();
  }

  associer() {
    this.router.navigate(['./entreprise/societe']);
  }

  isValid( campo: string ) {
    return this.monFormulaire.controls[campo].errors 
            && this.monFormulaire.controls[campo].touched;
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.entreprise =  this.entrepriseService.getDataEntreprise();
    console.log('entrerpise init statut', this.entreprise)
    this.controle = this.controleService.getControle();

    //MaJ le formulaire ?? partir des valeurs du service
    this.monFormulaire.controls['statut'].setValue(this.individu.statut);
    this.monFormulaire.controls['fonction'].setValue(this.individu.fonction);
    this.monFormulaire.controls['nir'].setValue(this.individu.nir);
    this.monFormulaire.controls['siret'].setValue(this.individu.siret);
    this.monFormulaire.controls['siren'].setValue(this.individu.siren);

    //D??sactiver champs de saisie
    if (this.individu.statut == 'salarie') {
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].disable();
      this.monFormulaire.controls['siren'].disable();
      
    }
    else if (this.individu.statut == 'ti' || this.statInd == 'me'){
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].enable();
      this.monFormulaire.controls['siren'].enable();
    }
    else if (this.individu.statut == 'autre'){
      this.monFormulaire.controls['fonction'].enable();
      this.monFormulaire.controls['nir'].enable();
      this.monFormulaire.controls['siret'].enable();
      this.monFormulaire.controls['siren'].enable();
    }
    else {
      this.monFormulaire.controls['fonction'].disable();
      this.monFormulaire.controls['nir'].disable();
      this.monFormulaire.controls['siret'].disable();
      this.monFormulaire.controls['siren'].disable();
    }


    // console.log("identit?? entreprise est :")
    // console.log(this.idEnt)
    
    // this.idIndividu = this.statutIndividu.idindividu;
    // this.dataIndividu = this.statutIndividu.dataind;
    // this.statInd = this.statutIndividu.statutind;

    //recuperer valeurs service
    // this.monFormulaire.controls['statut'].setValue(this.statutIndividu.statutind);
    // this.monFormulaire.controls['fonction'].setValue(this.dataIndividu[7].valeur);
    // this.monFormulaire.controls['nir'].setValue(this.dataIndividu[8].valeur);
    // this.monFormulaire.controls['siret'].setValue(this.dataIndividu[9].valeur);
    // this.monFormulaire.controls['siren'].setValue(this.dataIndividu[10].valeur);

    // this.entreprise.id = this.dataIndividu[116].valeur;
    // this.entreprise.denomination = this.dataIndividu[117].valeur; 
    // this.entreprise.siren_fiche = this.dataIndividu[118].valeur;
    // this.entreprise.adresse_siege = this.dataIndividu[119].valeur;
    // this.entreprise.denominationI = this.dataIndividu[120].valeur;
    // this.entreprise.adresse_siegeI = this.dataIndividu[121].valeur;
  }


}
