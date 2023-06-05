import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { SharedStatutService } from 'src/app/dossier/shared-statut.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Ind, data } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from '../../../shared/interfaces/individus.interface';

import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from '../../services/entreprise.service';

interface MenuItem {
  texte: string;
  route: string;
}
interface DataItem {
  titre: string;
  valeur: any;
}


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }
      mat-sidenav-container {
        height: calc(205vh - 115vh)
      }  
      mat-sidenav {
        width: 200px;
        background-color: #eee;
      } 
    `
  ]

})


export class SidemenuComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  notificationSubscription: Subscription;
  affichageSubscription: Subscription;

  private _success = new Subject<string>();
  successMessage = '';
  idIndividu !: string | number;
  individu!: Ind;
  individus: Individu[] = [];
  controle!: Controle;
  fiche !: boolean;
  menuNav: boolean[] = [];
  info !: boolean;
  source!: string;

  consentementIndividu: boolean = false;
  refusIndividu: boolean = false;
  blockNavigation: boolean = true;
  dataIndividu: DataItem[] = [];
  formulaireMenu: MenuItem[] = [
    {
      texte: 'Description des tâches',
      route: './description'
    },
    {
      texte: 'Statut',
      route: './statut'
    },
    {
      texte: 'Identité',
      route: './identite'
    },
    {
      texte: 'Rémunération et salariat',
      route: './remuneration'
    },
    {
      texte: 'Autres informations',
      route: './autres'
    },
  ]
  
  infos: data[] = [
    {
      source: "REI",
      vide: true,
      new : false,
      champs: [
        { col: "rei_siren", titre: "Siren" },
        { col: "rei_siret", titre: "Siret" },
        { col: "rei_denomination", titre: "Dénomination sociale" },
        { col: "rei_code_naf", titre: "Code NAF" },
        { col: "rei_dt_creation", titre: "Date de création" },
        { col: "rei_dt_debut", titre: "Date de début d'activité" },
        { col: "rei_dt_fin", titre: "Date de fin d'activité" },
        { col: "rei_voie", titre: "Libellé de voie" },
        { col: "rei_urssaf", titre: "Code Urssaf" },
        { col: "rei_cp", titre: "Code postal cedex" },
        { col: "rei_cp_insee", titre: "Code Postal Insee" },
        { col: "rei_comune", titre: "Libellé commune" },
        { col: "rei_qualite_dir", titre: "Qualité du dirigeant" },
        { col: "rei_nom", titre: "Nom du dirigeant" },
        { col: "rei_prenom", titre: "Prénom du dirigeant" },
        { col: "rei_dt_naiss", titre: "Date de naissance du dirigeant" },
        { col: "rei_lieu_naiss", titre: "Commune de naissance du dirigeant" },
        { col: "rei_titre", titre: "Titre" },
        { col: "rei_num_cext", titre: "No interne de compte" },
        { col: "rei_num_cint", titre: "No externe de compte" }
      ]
    },
    {
      source: "DPAE",
      vide: true,
      new : false,
      champs: [
        { col: "dpae_siret", titre: "Siret" },
        { col: "dpae_nom", titre: "Nom" },
        { col: "dpae_prenom", titre: "Prénom" },
        { col: "dpae_dt_naiss", titre: "Date de naissance" },
        { col: "dpae_dt_emb", titre: "Date d'embauche" },
        { col: "dpae_hr_emb", titre: "Heure d'embauche" },
        { col: "dpae_dt_decl", titre: "Date de déclaration" },
        { col: "dpae_hr_decl", titre: "Heure de déclaration" },
      ]
    },
    {
      source: "DSN",
      vide: true,
      new : false,
      champs: [
        { col: "dsn_adresse", titre: "Adresse de domicile" },
        { col: "dsn_activite", titre: "Emploi occupé" },
        { col: "dsn_contrat", titre: "Type de contrat" },
        { col: "dsn_dt_emb", titre: "Date d'embauche" },
        { col: "dsn_duree", titre: "Durée du travail" },
        { col: "dsn_s_brut", titre: "Salaire brut" },
        { col: "dsn_dernier_mois", titre: "Dernière période de déclaration" },
        { col: "dsn_nom", titre: "Nom" },
        { col: "dsn_prenom", titre: "Prénom" },
        { col: "dsn_dt_naiss", titre: "Date de naissance" },
        { col: "dsn_nir", titre: "NIR" }
      ]
    },
    {
      source: "OBP7",
      vide: true,
      new : false,
      champs: [
        { col: "obp7_num_compte", titre: "Numéro interne de compte" },
        { col: "obp7_to", titre: "TO" },
        { col: "obp7_periode", titre: "Code période" }
      ]
    },
    {
      source: "OPC",
      vide: true,
      new : false,
      champs: [
        { col: "opc_num_intervention", titre: "No intervention" },
        { col: "opc_dt_creation", titre: "Date création" },
        { col: "opc_realisateur", titre: "Réalisateur principal" },
        { col: "opc_action", titre: "Type d'action" },
        { col: "opc_pilote", titre: "Organisme Pilote" },
        { col: "opc_delegue", titre: "Code structure délégué" },
        { col: "opc_etat", titre: "Etat intervention" },
        { col: "opc_dt_etat", titre: "Date état intervention" },
      ]
    },
    {
      source: "CAAE",
      vide: true,
      new : false,
      champs: [
        { col: "caae_num_compte", titre: "No compte" },
        { col: "caae_periodes", titre: "Période" },
        { col: "caae_ca", titre: "Chiffre d'affaires" },
      ]
    },
  ]

  constructor(public statutIndividu: SharedStatutService,
    private controleService: ControleService,
    private entrepriseService: EntrepriseService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.notificationSubscription = this.dataService.getNotification().subscribe(() => {
      this.notification();
    })

    this.affichageSubscription = this.dataService.getAffichage().subscribe(() => {
      this.affichage();
    })
  }

  // get individuFormulaire(): Ind {
  //   return this.dataService.getIndividu();
  // }

  // get navigation(): boolean {
  //   return this.statutIndividu.blocknav;
  // }


  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;
  

  enregistrerIndividu() {
    this.dataService.editerIndividu(this.individu).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/controle/individus', this.controle.id]);
    });
  }

  get creationFiche() {
    this.fiche = this.entrepriseService.getCreationFiche();
    return this.entrepriseService.getCreationFiche()

  }

  changeSource(srce: string) {
    this.source = srce;
    this.infos.forEach(data => {
      if(data.source == srce){
        data.new = false;
      }
    })
  }

  notification() {
    console.log('notification called');
    this._success.next("Toc, toc... Vous avez reçu de nouvelles informations. Voulez-vous les consulter ?");
    this.retourInfo();
  }

  affichage() {
    console.log('affichage called');
    this.drawer.toggle();
  }

  getFormattedInfo(champ: string ) {
    return this.individu.infos[champ];
  }

  //method pour verifier s'il y a des informations sur une source d'information
  retourInfo() {    
     //auxiliar to verify if there is data
    this.infos.forEach(data => {  
      let aux = true;
      data.champs.forEach(champ =>{
        if (!(this.getFormattedInfo(champ.col) == '' || this.getFormattedInfo(champ.col) == 'null' || this.getFormattedInfo(champ.col) == '-')) {
          aux = false;
        } 
      })
      data.vide = aux;
      data.new = !aux;
    });
  }

  initInfo() {    
    //auxiliar to verify if there is data
   this.infos.forEach(data => {  
     let aux = true;
     data.champs.forEach(champ =>{
       if (!(this.getFormattedInfo(champ.col) == '' || this.getFormattedInfo(champ.col) == 'null' || this.getFormattedInfo(champ.col) == '-')) {
         aux = false;
       } 
     })
     data.vide = aux;
   });
 }

 

  ngOnInit() {
    this.individu = this.dataService.getIndividu();
    this.info = false;
    this.source = 'all';

    this.initInfo();

    this.dataService.nav$.subscribe(navigation => {
      console.log('navigations values update: ', navigation);
      this.menuNav = navigation;

    })
    if (this.individu.statut == 'ti') {
      if (this.individu.denominationEntPerso == '') {
        this.dataService.setnav([false, false, false, true, true]);
      } else {
        this.dataService.setnav([false, false, false, false, false]);
      }
    } else if (this.individu.statut == 'salarie') {
      this.dataService.setnav([false, false, false, false, false]);
    } else if (this.individu.statut == 'autre') {
      if (this.individu.fonction == '') {
        this.dataService.setnav([false, false, true, true, true]);
      } else {
        this.dataService.setnav([false, false, false, false, false]);
      }
    } else if (this.individu.statut == 'me') {
      if (this.individu.denominationEntPerso == '') {
        this.dataService.setnav([false, false, false, true, true]);
      } else {
        this.dataService.setnav([false, false, false, false, false]);
      }
    } else {
      if (this.individu.signature == '') {
        this.dataService.setnav([false, true, true, true, true]);
      } else {
        this.dataService.setnav([false, false, true, true, true]);
      }
    }



    this.fiche = false;

    this.controle = this.controleService.getControle();
    this.idIndividu = this.statutIndividu.idindividu;
    this.consentementIndividu = this.statutIndividu.consentementInd;
    this.refusIndividu = this.statutIndividu.refusInd;
    this.blockNavigation = this.statutIndividu.blocknav;

    this._success.subscribe((message) => (this.successMessage = message));

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        console.log('Closing Alert');
        this.selfClosingAlert.close();
        this.individu.infos.retour_systeme = '';
        this.dataService.setIndividu(this.individu);
        this.dataService.setNotification(false);
      }
    });

    this.activatedRoute.params
      .subscribe(({ id }) => console.log(id))
    console.log(this.activatedRoute.params)
    

  }

  


}
