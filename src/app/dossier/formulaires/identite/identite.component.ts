import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignatureComponent } from '../signature/signature.component';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styles: []
})

export class IdentiteComponent implements OnInit {
  private _success = new Subject<string>();
	successMessage = '';
  
  individu!: Ind;
  controle!: Controle;

  routeCloture: string = './formulaires/cloture/'
  //Vars pour le champ pays
  keyword = 'name';
  cle_pays: string = 'pays';

  date: any;

 
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  monFormulaire: FormGroup = this.fb.group({
    civilite: ['', [Validators.required]],
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    dt_naissance: ['', [Validators.required]],
    lieu_naissance: ['', [Validators.required]],
    nationalite_fr: ['', [Validators.required]],
    pays_naissance: ['', [Validators.required]],
    tel: ['', [Validators.required]],

    adresse_perso: ['', [Validators.required]],
    cp_perso: ['', [Validators.required]],
    ville_perso: ['', [Validators.required]],
    difference_adresse: ['', [Validators.required]], 
    adresse_pro: ['', [Validators.required]],
    cp_pro: ['', [Validators.required]],
    ville_pro: ['', [Validators.required]],

    dt_creation: ['', [Validators.required]],
    type_statut: ['', [Validators.required]],
    autre_statut: ['', [Validators.required]],
  });

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private controleService: ControleService,
    private entrepriseService: EntrepriseService,
    private dataService: DataService,
    private router: Router
  ) { }

  ouvrirModal() {
    const modalRef = this.modalService.open(SignatureComponent, { size: 'xl' });
    this.changeVal()
  }

  // changerCiv(e: any) {
  //   this.civilite?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // changerBis(e: any) {
  //   this.bis?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  selectEvent(item: any) { }
  selectEventCountry(item: any) { }
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  // changerLibelle(e: any) {
  //   this.libelle?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  onCountryCleared(item: any, flag: any) { }
  // changerStatut(e: any) {
  //   console.log('value event e', e);
  //   this.type_statut?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  // get civilite() {
  //   return this.monFormulaire.get('civilite');
  // }
  // get bis() {
  //   return this.monFormulaire.get('bis');
  // }
  // get libelle() {
  //   return this.monFormulaire.get('libelle');
  // }
  // get type_statut() {
  //   return this.monFormulaire.get('type_statut');
  // }
  customFilter = function (pays_monde: any[], query: string): any[] {
    return pays_monde.filter(x => x.name.toLowerCase().startsWith(query.toLowerCase()));
  };
  // data
  civs: any = ['Madame', 'Mademoiselle', 'Monsieur'];
  bises: any = ['', 'A', 'B', 'BIS', 'C', 'D', 'TER', 'QUTER', 'QUINQUIES'];
  libelles: any = ['', 'Allée', 'Anse', 'Avenue', 'Berge', 'Boulevard', 'Carrefour', 'Chaussée', 'Chemin', 'Cité', 'Clos', 'Côte', 'Cour', 'Cours', 'Cul-de-Sac', 'Degré', 'Descente', 'Digue', 'Drève', 'Escalier', 'Escoussière', 'Esplanade', 'Gaffe', 'Giratoire', 'Grand-route', 'Impasse', 'Jardin', 'Liaison', 'Mail', 'Montée', 'Parvis', 'Passage', 'Passerelle', 'Place', 'Placette', 'Pont', 'Promenade', 'Quai', 'Résidence', 'Rang', 'Rampe', 'Rond-point', 'Route', 'Rue', 'Ruelle', 'Sente', 'Sentier', 'Square', 'Traboule', 'Traverse', 'Venelle', 'Villa', 'Voie'];
  type_statuts: any = ['Co-gérant', 'Entrepreneur individuel', 'Gérant majoritaire', 'Autre'];

  public pays_monde = [
    'Afghanistan', 'Afrique du Sud', 'Aland, Iles', 'Albanie', 'Algérie', 'Allemagne', "Allemagne de l'EST", 'Andorre', 'Angola', 'Anguilla', 'Antarctique', 'Antigua et Barbuda', 'Antilles néerlandaises', 'Arabie Saoudite', 'Argentine', 'Arménie', 'Aruba', 'Australie', "Autriche", 'Azerbaïdjan', 'Bahamas', 'Bahrein', 'Bangladesh', 'Barbade', 'Bélarus', 'Belgique', 'Bélize', 'Bénin', 'Bermudes', 'Bhoutan', 'Bolivie', "Bonaire, Saint-Eustache et Saba", 'Bosnie', 'Botswana', 'Bouvet, Ile', 'Brésil', 'Brunéi Darussalam', 'Bulgarie', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Caïmans, Iles', 'Cambodge', "Cameroun", 'Canada', 'Chili', 'Chine', 'Christmas, île', 'Chypre', 'Cocos/Keeling (Îles)', 'Colombie', 'Comores', 'Congo', 'Congo, République démocratique du', 'Cook, Iles', "Corée, République de", 'Corée, République populaire démocratique de', 'Costa Rica', "Côte d'Ivoire", 'Croatie', 'Cuba', 'Curaçao', 'Danemark', 'Djibouti', 'Dominicaine, République', 'Dominique', 'Egypte', "El Salvador", 'Emirats arabes unis', 'Equateur', 'Erythrée', 'Espagne', 'Estonie', "Etats-Unis d'Amérique", 'Ethiopie', 'Falkland/Malouines (Îles)', 'Féroé, îles', 'Fidji', 'Finlande', "France", 'Gabon', 'Gambie', 'Géorgie', 'Géorgie du sud et les îles Sandwich du sud', 'Ghana', 'Gibraltar', 'Grèce', 'Grenade', 'Groenland', 'Guadeloupe', 'Guam', "Guatemala", 'Guernesey', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana', 'Guyane française', 'Haïti', 'Heard, Ile et MacDonald, îles', 'Honduras', 'Hong Kong', 'Hongrie', "Île de Man", 'Îles mineures éloignées des Etats-Unis', 'Îles vierges britanniques', 'Îles vierges des Etats-Unis', 'Inde', "Indien (Territoire britannique de l'océan)", 'Indonésie', "Iran, République islamique d'", 'Iraq', 'Irlande', 'Islande', 'Israël', "Italie", 'Jamaïque', 'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït', 'Lao, République démocratique populaire', 'Lesotho', "Lettonie", 'Liban', 'Libéria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macao', "Macédoine, l'ex-République yougoslave de", 'Madagascar', 'Malaisie', 'Malawi', "Maldives", 'Mali', 'Malte', 'Mariannes du nord, Iles', 'Maroc', 'Marshall, Iles', 'Martinique', 'Maurice', 'Mauritanie', 'Mayotte', 'Mexique', 'Micronésie, Etats Fédérés de', "Moldova, République de", 'Monaco', 'Mongolie', 'Monténégro', 'Montserrat', 'Mozambique', 'Myanmar', 'Namibie', 'Nauru', 'Népal', 'Nicaragua', 'Niger', "Nigéria", 'Niue', 'Norfolk, Ile', 'Norvège', 'Nouvelle-Calédonie', 'Nouvelle-Zélande', 'Oman', 'Ouganda', 'Ouzbékistan', 'Pakistan', 'Palaos', 'Palestine, Etat de', "Panama", 'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pays inconnu', 'Pays multiples', 'Pérou', 'Philippines', 'Pitcairn', 'Pologne', 'Polynésie française', 'Porto Rico', "Portugal", 'Qatar', 'République arabe syrienne', 'République centrafricaine', 'Réunion', 'Roumanie', "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord", 'Russie, Fédération de', 'Rwanda', 'Sahara occidental', 'Saint-Barthélemy', 'Saint-Kitts-et-Nevis', 'Saint-Marin', 'Saint-Martin (partie française)', "Saint-Martin (partie néerlandaise)", 'Saint-Pierre-et-Miquelon', 'Saint-Siège', 'Saint-Vincent-et-les-Grenadines', 'Sainte-Hélène, Ascension et Tristan da Cunha', 'Sainte-Lucie', 'Salomon, Iles', 'Samoa', 'Samoa américaines', 'Sao Tomé-et-Principe', 'Sénégal', 'Serbie', "Seychelles", 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud', 'Sri Lanka', 'Suède', 'Suisse', "Suriname", 'Svalbard et île Jan Mayen', 'Swaziland', 'Tadjikistan', 'Taïwan, Province de Chine', 'Tanzanie, République unie de', 'Tchad', 'Tchécoslovaquie', 'Tchèque, République', 'Terres australes françaises', 'Thaïlande', 'Timor-Leste', "Togo", 'Tokelau', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Turks-et-Caïcos (Îles)', 'Turquie', 'Tuvalu', 'Ukraine', 'URSS', 'Uruguay', "Vanuatu", 'Vatican : voir Saint-Siège', 'Venezuela (République bolivarienne du)', 'Viet Nam', 'Viet Nam (Sud)', 'Wallis et Futuna', 'Yémen', 'Yougoslavie', 'Zaïre', 'Zambie', 'Zimbabwe'];

  enregistrer() {
    if (this.monFormulaire.invalid) {
      this.monFormulaire.markAllAsTouched();
      return;
    }
    console.log(this.monFormulaire.value);
    this.monFormulaire.reset();
  }

  isValid(campo: string) {

    return this.monFormulaire.controls[campo].errors
      && this.monFormulaire.controls[campo].touched;
  }

  changeVal() {

    // this.monFormulaire.controls['nom'].value && this.monFormulaire.controls['prenom'].value && this.monFormulaire.controls['dt_naissance'].value != '' ?
    //   (this.statutIndividu.newmininfo = true) : (this.statutIndividu.newmininfo = false);

    console.log('Change Val Activated');

    

    this.individu.civilite = this.monFormulaire.value.civilite;
    this.individu.nom = this.monFormulaire.value.nom;
    this.individu.prenom = this.monFormulaire.value.prenom;
    this.individu.dt_naissance = this.monFormulaire.value.dt_naissance;
    this.individu.lieu_naissance = this.monFormulaire.value.lieu_naissance;
    this.individu.nationalite_fr = this.monFormulaire.value.nationalite_fr;
    this.individu.pays_naissance = this.monFormulaire.value.pays_naissance;
    this.individu.tel = this.monFormulaire.value.tel;
    this.individu.adresse_perso = this.monFormulaire.value.adresse_perso;
    this.individu.cp_perso = this.monFormulaire.value.cp_perso;
    this.individu.ville_perso = this.monFormulaire.value.ville_perso;
    this.individu.difference_adresse = this.monFormulaire.value.difference_adresse;
    this.individu.adresse_pro = this.monFormulaire.value.adresse_pro;
    this.individu.cp_pro = this.monFormulaire.value.cp_pro;
    this.individu.ville_pro = this.monFormulaire.value.ville_pro;

    //MaJ dans le service
    this.dataService.setIndividu(this.individu);

  }

  ouvrirRecap() {
    return
  }
  minInfo() {
    if (this.monFormulaire.controls['nom'].value != '' && this.monFormulaire.controls['prenom'].value != ''
      && this.monFormulaire.controls['dt_naissance'].value != '') {
      return true;
    } else {
      return false;
    }
  }

  changeValEnt(entreprise: Entreprise) {

    entreprise.siren_fiche = this.individu.siren;
    entreprise.denomination = this.individu.nom.concat(' ', this.individu.prenom);
    if (this.individu.adresse_perso != '') {
      entreprise.adresse_siege = this.individu.adresse_perso;
    }

    entreprise.dirigent = this.individu.nom.concat(' ', this.individu.prenom);
    entreprise.date_dirigeant = this.individu.dt_naissance;
    entreprise.lieu_dirigeant = this.individu.adresse_perso;

    // //MaJ dans le service
    this.entrepriseService.setEntreprise(entreprise);
    // this.entrepriseService.newData = this.entreprise;
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

  alerteFiche() { 
    this._success.next('Bravo, votre fiche entreprise a été créée'); 
  }



  ngOnInit() {
    this.controle = this.controleService.getControle();
    this.individu = this.dataService.getIndividu();
    this.date = this.obtenirDate(new Date());

    //MaJ le formulaire à partir des valeurs du service
    this.monFormulaire.controls['civilite'].setValue(this.individu.civilite);
    this.monFormulaire.controls['nom'].setValue(this.individu.nom);
    this.monFormulaire.controls['prenom'].setValue(this.individu.prenom);
    this.monFormulaire.controls['dt_naissance'].setValue(this.individu.dt_naissance);
    this.monFormulaire.controls['lieu_naissance'].setValue(this.individu.lieu_naissance);
    this.monFormulaire.controls['nationalite_fr'].setValue(this.individu.nationalite_fr);
    this.monFormulaire.controls['pays_naissance'].setValue(this.individu.pays_naissance);
    this.monFormulaire.controls['tel'].setValue(this.individu.tel);
    this.monFormulaire.controls['adresse_perso'].setValue(this.individu.adresse_perso);
    this.monFormulaire.controls['cp_perso'].setValue(this.individu.cp_perso);
    this.monFormulaire.controls['ville_perso'].setValue(this.individu.ville_perso);
    this.monFormulaire.controls['difference_adresse'].setValue(this.individu.difference_adresse);    
    this.monFormulaire.controls['adresse_pro'].setValue(this.individu.adresse_pro);
    this.monFormulaire.controls['cp_pro'].setValue(this.individu.cp_pro);
    this.monFormulaire.controls['ville_pro'].setValue(this.individu.ville_pro);

    //Check pour la creation d'une fiche
    if (this.entrepriseService.getCreationFiche()) {
      const subscription = this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
              if (this.minInfo()) {
                console.log('Event creation fiche');
                console.log(event);

                let entreprise: Entreprise = this.entrepriseService.getNouvelleEntreprise();
                if (!entreprise.id_individus.includes(this.individu.id)) {
                  entreprise.id_individus.push(this.individu.id);
                }
                this.changeValEnt(entreprise);
                entreprise.date = this.date;

                this.entrepriseService.ajouterEntreprise(entreprise).
                  subscribe(resp => {
                    console.log('reponse AJ Entreprise creation', resp);
                    this.controle.entreprises_controle.push(resp.id);
                    this.controleService.setControle(this.controle);
                    this.entrepriseService.setEntreprise(resp);

                    this.individu.idEnt = resp.id;
                    this.individu.denominationEnt = resp.denomination;
                    this.individu.siren_fiche = resp.siren_fiche;
                    this.individu.adresse_siege = resp.adresse_siege;

                    
                  });

                this.entrepriseService.resetEntreprise();


              }
              this.entrepriseService.setCreationFiche(false);
              this.entrepriseService.setAlerteFiche(true);
              subscription.unsubscribe();
            }
          });
    }
    this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

}
