import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignatureComponent } from '../signature/signature.component';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface DataItem{
  titre: string;
  valeur: string;
}

@Component({
  selector: 'app-remuneration',
  templateUrl: './remuneration.component.html',
  styles: [
  ]
})
export class RemunerationComponent implements OnInit {
  private _success = new Subject<string>();
	successMessage = '';
  
  individu!: Ind;
  
  idIndividu !: string|number;
  dataIndividu: DataItem[] = []; 
  routeEntite : string = './formulaires/fiche-entite';
  routeCloture : string = './formulaires/cloture';

  public statInd : string = '';
  // public salarieVisible : boolean = true;
  // public tiVisible : boolean = true;
  // public meVisible : boolean = true;
  // public autreVisible : boolean = true;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  monFormulaire: FormGroup = this.fb.group({
    emploi: [ '', [ Validators.required]],
    contrat: [ '', [ Validators.required ]],
    dt_embauche: [ '', [ Validators.required]],
    duree: [ '', [ Validators.required]],
    bullentins: [ '', [ Validators.required]],
    hsup: [ '', [ Validators.required]],
    sbrut: [ '', [ Validators.required]],
    fsalaire: [ '', [ Validators.required]],
    montant: [ '', [ Validators.required]],
    remunere: [ '', [ Validators.required]],
    ca: [ '', [ Validators.required]],
    rmensuelle: [ '', [ Validators.required]],
    snombre: [ '', [ Validators.required]],
    total: [ '', [ Validators.required]],
    identites: [ '', [ Validators.required]],

    interimaire: [ '', [ Validators.required]],
    sirenI: [ '', [ Validators.required]],
    denominationI: [ '', [ Validators.required]],
    adresse_siegeI: [ '', [ Validators.required]],
  })

  
  constructor(private modalService: NgbModal, 
              private fb: FormBuilder, 
              private entrepriseService: EntrepriseService,
              private dataService : DataService) { }

  changeVal(){
    this.individu.emploi = this.monFormulaire.controls['emploi'].value;
    this.individu.contrat = this.monFormulaire.controls['contrat'].value;
    this.individu.dt_embauche = this.monFormulaire.controls['dt_embauche'].value;
    this.individu.duree = this.monFormulaire.controls['duree'].value;
    this.individu.bullentins = this.monFormulaire.controls['bullentins'].value;
    this.individu.hsup = this.monFormulaire.controls['hsup'].value;
    this.individu.sbrut = this.monFormulaire.controls['sbrut'].value;
    this.individu.fsalaire = this.monFormulaire.controls['fsalaire'].value;
    this.individu.montant = this.monFormulaire.controls['montant'].value;
    this.individu.remunere = this.monFormulaire.controls['remunere'].value;
    this.individu.ca = this.monFormulaire.controls['ca'].value;
    this.individu.rmensuelle = this.monFormulaire.controls['rmensuelle'].value;
    this.individu.snombre = this.monFormulaire.controls['snombre'].value;
    this.individu.total = this.monFormulaire.controls['total'].value;
    this.individu.identites = this.monFormulaire.controls['identites'].value;

    this.individu.interimaire = this.monFormulaire.controls['interimaire'].value;
    this.individu.sirenI = this.monFormulaire.controls['sirenI'].value;
    this.individu.denominationI = this.monFormulaire.controls['denominationI'].value;
    this.individu.adresse_siegeI = this.monFormulaire.controls['adresse_siegeI'].value;

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );

    //Check individu interimaire
    (this.monFormulaire.value.interimaire  == true) ? 
    (this.monFormulaire.controls['sirenI'].enable(),
    this.monFormulaire.controls['denominationI'].enable(),
    this.monFormulaire.controls['adresse_siegeI'].enable())
    :
    (this.monFormulaire.controls['sirenI'].disable(),
    this.monFormulaire.controls['denominationI'].disable(),
    this.monFormulaire.controls['adresse_siegeI'].disable());


  }
  ouvrirRecap() {
    return
  }

  ouvrirModal() {
    const modalRef = this.modalService.open(SignatureComponent, { size: 'xl' });
    // this.dataIndividu[10].valeur = this.monFormulaire.controls['fonction'].value;
    // this.dataIndividu[11].valeur = this.monFormulaire.controls['nir'].value;
    // this.dataIndividu[12].valeur = this.monFormulaire.controls['siret'].value;
    // this.dataIndividu[13].valeur = this.monFormulaire.controls['dt_naissance'].value;
    // this.dataIndividu[14].valeur = this.monFormulaire.controls['lieu_naissance'].value;
    // this.dataIndividu[15].valeur = this.monFormulaire.controls['nationalite_fr'].value;
    // this.dataIndividu[16].valeur = this.monFormulaire.controls['pays_naissance'].value;
    // this.dataIndividu[17].valeur = this.monFormulaire.controls['tel'].value;
    // this.dataIndividu[18].valeur = this.monFormulaire.controls['n_voie'].value;
    // this.dataIndividu[19].valeur = this.monFormulaire.controls['bis'].value;
    // this.dataIndividu[20].valeur = this.monFormulaire.controls['libelle'].value;
    // this.dataIndividu[21].valeur = this.monFormulaire.controls['complement'].value;
    // this.dataIndividu[22].valeur = this.monFormulaire.controls['cp'].value;
    // this.dataIndividu[23].valeur = this.monFormulaire.controls['ville'].value;
    // this.dataIndividu[24].valeur = this.monFormulaire.controls['dt_creation'].value;
    // this.dataIndividu[25].valeur = this.monFormulaire.controls['type_statut'].value;

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );
  }

  
  // changerCont(e: any){
  //   this.contrat?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // changerReception(e: any){
  //   this.cadre?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // changerHsup(e: any){
  //   this.hsup?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // changerType(e: any){
  //   this.fsalaire?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // changerCiv(e: any){
  //   this.civilite?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  alerteFiche() { 
    this._success.next('Bravo, votre fiche entreprise a été créée'); 
    this.entrepriseService.setAlerteFiche(false);
    console.log('AlerteFiche val ', this.entrepriseService.getAlerteFiche())
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service

    this.monFormulaire.controls['emploi'].setValue(this.individu.emploi);
    this.monFormulaire.controls['contrat'].setValue(this.individu.contrat);
    this.monFormulaire.controls['dt_embauche'].setValue(this.individu.dt_embauche);
    this.monFormulaire.controls['duree'].setValue(this.individu.duree);
    this.monFormulaire.controls['bullentins'].setValue(this.individu.bullentins);
    this.monFormulaire.controls['hsup'].setValue(this.individu.hsup);
    this.monFormulaire.controls['sbrut'].setValue(this.individu.sbrut);
    this.monFormulaire.controls['fsalaire'].setValue(this.individu.fsalaire);
    this.monFormulaire.controls['montant'].setValue(this.individu.montant);
    this.monFormulaire.controls['remunere'].setValue(this.individu.remunere);
    this.monFormulaire.controls['ca'].setValue(this.individu.ca);
    this.monFormulaire.controls['rmensuelle'].setValue(this.individu.rmensuelle);
    this.monFormulaire.controls['snombre'].setValue(this.individu.snombre);
    this.monFormulaire.controls['total'].setValue(this.individu.total);
    this.monFormulaire.controls['identites'].setValue(this.individu.identites);

    this.monFormulaire.controls['interimaire'].setValue(this.individu.interimaire);
    this.monFormulaire.controls['sirenI'].setValue(this.individu.sirenI);
    this.monFormulaire.controls['denominationI'].setValue(this.individu.denominationI);
    this.monFormulaire.controls['adresse_siegeI'].setValue(this.individu.adresse_siegeI);
    
    
    

    if (this.individu.statut == 'salarie' || this.individu.statut == 'autre' ) {
      this.monFormulaire.controls['emploi'].enable();
      this.monFormulaire.controls['contrat'].enable();
      this.monFormulaire.controls['dt_embauche'].enable();
      this.monFormulaire.controls['duree'].enable();
      this.monFormulaire.controls['bullentins'].enable();
      this.monFormulaire.controls['sbrut'].enable();
      this.monFormulaire.controls['fsalaire'].enable();
      this.monFormulaire.controls['montant'].enable();

      this.monFormulaire.controls['remunere'].disable();
      this.monFormulaire.controls['rmensuelle'].disable();
      this.monFormulaire.controls['snombre'].disable();
      this.monFormulaire.controls['total'].disable();
      this.monFormulaire.controls['identites'].disable();

      //Désactiver champs de saisie Interim
      (this.monFormulaire.value.interimaire  == true) ? 
      (this.monFormulaire.controls['sirenI'].enable(),
      this.monFormulaire.controls['denominationI'].enable(),
      this.monFormulaire.controls['adresse_siegeI'].enable())
      :
      (this.monFormulaire.controls['sirenI'].disable(),
      this.monFormulaire.controls['denominationI'].disable(),
      this.monFormulaire.controls['adresse_siegeI'].disable());      
  
    }else if (this.individu.statut == 'me'|| this.individu.statut == 'ti' ) {
      this.monFormulaire.controls['emploi'].disable()
      this.monFormulaire.controls['contrat'].disable()
      this.monFormulaire.controls['dt_embauche'].disable()
      this.monFormulaire.controls['duree'].disable()
      this.monFormulaire.controls['bullentins'].disable()
      this.monFormulaire.controls['sbrut'].disable()
      this.monFormulaire.controls['fsalaire'].disable()
      this.monFormulaire.controls['montant'].disable()
      this.monFormulaire.controls['interimaire'].disable()
      this.monFormulaire.controls['sirenI'].disable()
      this.monFormulaire.controls['denominationI'].disable()
      this.monFormulaire.controls['adresse_siegeI'].disable()

      this.monFormulaire.controls['remunere'].enable()
      this.monFormulaire.controls['rmensuelle'].enable()
      this.monFormulaire.controls['snombre'].enable()
      this.monFormulaire.controls['total'].enable()
      this.monFormulaire.controls['identites'].enable()
    }
    

    this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});

    if(this.entrepriseService.getAlerteFiche()){
      console.log('ALERTE FICHE ', this.entrepriseService.getAlerteFiche())
      this.alerteFiche();
      
    }
  }
  // changerStatut(e: any){
  //   this.contrat?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // get contrat(){
  //   return this.monFormulaire.get('contrat');
  // }
  // get cadre(){
  //   return this.monFormulaire.get('cadre');
  // }
  // get hsup(){
  //   return this.monFormulaire.get('hsup');
  // }
  // get fsalaire(){
  //   return this.monFormulaire.get('fsalaire');
  // }

  // data
  contrats: any = ["CAE (Contrat d'accompagnement dans l'emploi)", "CDD (Contrat à durée déterminée)", "CDI (Contrat à durée indéterminée)", "CIE (Contrat initiative emploi)",	
    "Contrat d'apprentissage", "Contrat de professionnalisation",	"CTT (Contrat de travail temporaire ou intérim)",	"CUI (Contrat unique d'insertion)"];

  bulletins: any = ["Oui", "Non"];
  heuresSup: any = ["Oui", "Non"];
  typeSalaire: any = ["horaire", "journalier", "hebdomadaire", "mensuel", "annuel" ];
}

