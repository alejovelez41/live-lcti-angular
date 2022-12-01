import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedStatutService } from '../../shared-statut.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignatureComponent } from '../signature/signature.component';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styles: []})

export class IdentiteComponent implements OnInit {
  individu!: Ind;
  routeCloture: string = './formulaires/cloture/'
  //Vars pour le champ pays
  keyword = 'name';
  cle_pays: string = 'pays';

  monFormulaire: FormGroup = this.fb.group({
    civilite: ['', [Validators.required]],
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    dt_naissance: ['', [Validators.required]],
    lieu_naissance: ['', [Validators.required]],
    nationalite_fr: ['', [Validators.required]],
    pays_naissance: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    n_voie: ['', [Validators.required, , Validators.maxLength(10)]],
    bis: ['', [Validators.required]],
    libelle: ['', [Validators.required]],
    complement: ['', [Validators.required]],
    cp: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    dt_creation: ['', [Validators.required]],
    type_statut: ['', [Validators.required]],
    autre_statut: ['', [Validators.required]],
  });

  constructor(private modalService: NgbModal, private fb: FormBuilder, private dataService: DataService) { }

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
  libelles: any = [ '', 'Allée', 'Anse', 'Avenue', 'Berge', 'Boulevard', 'Carrefour', 'Chaussée', 'Chemin', 'Cité', 'Clos', 'Côte', 'Cour', 'Cours', 'Cul-de-Sac', 'Degré', 'Descente', 'Digue', 'Drève', 'Escalier', 'Escoussière', 'Esplanade', 'Gaffe', 'Giratoire', 'Grand-route', 'Impasse', 'Jardin', 'Liaison', 'Mail', 'Montée', 'Parvis', 'Passage', 'Passerelle', 'Place', 'Placette', 'Pont', 'Promenade', 'Quai', 'Résidence', 'Rang', 'Rampe', 'Rond-point', 'Route', 'Rue', 'Ruelle', 'Sente', 'Sentier', 'Square', 'Traboule', 'Traverse', 'Venelle', 'Villa', 'Voie'];
  type_statuts: any = [ 'Co-gérant', 'Entrepreneur individuel', 'Gérant majoritaire', 'Autre'];

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
    this.individu.n_voie = this.monFormulaire.value.n_voie;
    this.individu.bis = this.monFormulaire.value.bis;
    this.individu.libelle = this.monFormulaire.value.libelle;
    this.individu.complement = this.monFormulaire.value.complement;
    this.individu.cp = this.monFormulaire.value.cp;
    this.individu.ville = this.monFormulaire.value.ville;
    this.individu.dt_creation = this.monFormulaire.value.dt_creation;
    this.individu.type_statut = this.monFormulaire.value.type_statut;
    this.individu.autre_statut = this.monFormulaire.value.autre_statut;


    //MaJ dans le service
    this.dataService.setIndividu( this.individu );

  }

  ouvrirRecap() {
    return
  }

  ngOnInit() {
    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service
    this.monFormulaire.controls['civilite'].setValue(this.individu.civilite);
    this.monFormulaire.controls['nom'].setValue(this.individu.nom);
    this.monFormulaire.controls['prenom'].setValue(this.individu.prenom);
    this.monFormulaire.controls['dt_naissance'].setValue(this.individu.dt_naissance);
    this.monFormulaire.controls['lieu_naissance'].setValue(this.individu.lieu_naissance);
    this.monFormulaire.controls['nationalite_fr'].setValue(this.individu.nationalite_fr);
    this.monFormulaire.controls['pays_naissance'].setValue(this.individu.pays_naissance);
    this.monFormulaire.controls['tel'].setValue(this.individu.tel);
    this.monFormulaire.controls['n_voie'].setValue(this.individu.n_voie);
    this.monFormulaire.controls['bis'].setValue(this.individu.bis);
    this.monFormulaire.controls['libelle'].setValue(this.individu.libelle);
    this.monFormulaire.controls['complement'].setValue(this.individu.complement);
    this.monFormulaire.controls['cp'].setValue(this.individu.cp);
    this.monFormulaire.controls['ville'].setValue(this.individu.ville);
    this.monFormulaire.controls['dt_creation'].setValue(this.individu.dt_creation);

    this.monFormulaire.controls['autre_statut'].setValue(this.individu.autre_statut);

    if (this.individu.statut == 'me') {this.monFormulaire.controls['type_statut'].setValue('Micro-Entrepreneur');} 
    else {this.monFormulaire.controls['type_statut'].setValue(this.individu.type_statut);}

    //Désactiver champs de saisie
    if (this.individu.statut == 'salarie' || this.individu.statut == 'autre') {
      this.monFormulaire.controls['dt_creation'].disable();
      this.monFormulaire.controls['type_statut'].disable();
    }
    else if  (this.individu.statut == 'ti') {
      this.monFormulaire.controls['dt_creation'].enable();
      this.monFormulaire.controls['type_statut'].enable();
      
    } else if  (this.individu.statut == 'me') {
      this.monFormulaire.controls['dt_creation'].enable();
      this.monFormulaire.controls['type_statut'].disable();
      
    }

  }

}
