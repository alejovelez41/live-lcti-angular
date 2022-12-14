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
  libelles: any = [ '', 'All??e', 'Anse', 'Avenue', 'Berge', 'Boulevard', 'Carrefour', 'Chauss??e', 'Chemin', 'Cit??', 'Clos', 'C??te', 'Cour', 'Cours', 'Cul-de-Sac', 'Degr??', 'Descente', 'Digue', 'Dr??ve', 'Escalier', 'Escoussi??re', 'Esplanade', 'Gaffe', 'Giratoire', 'Grand-route', 'Impasse', 'Jardin', 'Liaison', 'Mail', 'Mont??e', 'Parvis', 'Passage', 'Passerelle', 'Place', 'Placette', 'Pont', 'Promenade', 'Quai', 'R??sidence', 'Rang', 'Rampe', 'Rond-point', 'Route', 'Rue', 'Ruelle', 'Sente', 'Sentier', 'Square', 'Traboule', 'Traverse', 'Venelle', 'Villa', 'Voie'];
  type_statuts: any = [ 'Co-g??rant', 'Entrepreneur individuel', 'G??rant majoritaire', 'Autre'];

  public pays_monde = [
    'Afghanistan', 'Afrique du Sud', 'Aland, Iles', 'Albanie', 'Alg??rie', 'Allemagne', "Allemagne de l'EST", 'Andorre', 'Angola', 'Anguilla', 'Antarctique', 'Antigua et Barbuda', 'Antilles n??erlandaises', 'Arabie Saoudite', 'Argentine', 'Arm??nie', 'Aruba', 'Australie', "Autriche", 'Azerba??djan', 'Bahamas', 'Bahrein', 'Bangladesh', 'Barbade', 'B??larus', 'Belgique', 'B??lize', 'B??nin', 'Bermudes', 'Bhoutan', 'Bolivie', "Bonaire, Saint-Eustache et Saba", 'Bosnie', 'Botswana', 'Bouvet, Ile', 'Br??sil', 'Brun??i Darussalam', 'Bulgarie', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Ca??mans, Iles', 'Cambodge', "Cameroun", 'Canada', 'Chili', 'Chine', 'Christmas, ??le', 'Chypre', 'Cocos/Keeling (??les)', 'Colombie', 'Comores', 'Congo', 'Congo, R??publique d??mocratique du', 'Cook, Iles', "Cor??e, R??publique de", 'Cor??e, R??publique populaire d??mocratique de', 'Costa Rica', "C??te d'Ivoire", 'Croatie', 'Cuba', 'Cura??ao', 'Danemark', 'Djibouti', 'Dominicaine, R??publique', 'Dominique', 'Egypte', "El Salvador", 'Emirats arabes unis', 'Equateur', 'Erythr??e', 'Espagne', 'Estonie', "Etats-Unis d'Am??rique", 'Ethiopie', 'Falkland/Malouines (??les)', 'F??ro??, ??les', 'Fidji', 'Finlande', "France", 'Gabon', 'Gambie', 'G??orgie', 'G??orgie du sud et les ??les Sandwich du sud', 'Ghana', 'Gibraltar', 'Gr??ce', 'Grenade', 'Groenland', 'Guadeloupe', 'Guam', "Guatemala", 'Guernesey', 'Guin??e', 'Guin??e-Bissau', 'Guin??e ??quatoriale', 'Guyana', 'Guyane fran??aise', 'Ha??ti', 'Heard, Ile et MacDonald, ??les', 'Honduras', 'Hong Kong', 'Hongrie', "??le de Man", '??les mineures ??loign??es des Etats-Unis', '??les vierges britanniques', '??les vierges des Etats-Unis', 'Inde', "Indien (Territoire britannique de l'oc??an)", 'Indon??sie', "Iran, R??publique islamique d'", 'Iraq', 'Irlande', 'Islande', 'Isra??l', "Italie", 'Jama??que', 'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Kowe??t', 'Lao, R??publique d??mocratique populaire', 'Lesotho', "Lettonie", 'Liban', 'Lib??ria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macao', "Mac??doine, l'ex-R??publique yougoslave de", 'Madagascar', 'Malaisie', 'Malawi', "Maldives", 'Mali', 'Malte', 'Mariannes du nord, Iles', 'Maroc', 'Marshall, Iles', 'Martinique', 'Maurice', 'Mauritanie', 'Mayotte', 'Mexique', 'Micron??sie, Etats F??d??r??s de', "Moldova, R??publique de", 'Monaco', 'Mongolie', 'Mont??n??gro', 'Montserrat', 'Mozambique', 'Myanmar', 'Namibie', 'Nauru', 'N??pal', 'Nicaragua', 'Niger', "Nig??ria", 'Niue', 'Norfolk, Ile', 'Norv??ge', 'Nouvelle-Cal??donie', 'Nouvelle-Z??lande', 'Oman', 'Ouganda', 'Ouzb??kistan', 'Pakistan', 'Palaos', 'Palestine, Etat de', "Panama", 'Papouasie-Nouvelle-Guin??e', 'Paraguay', 'Pays-Bas', 'Pays inconnu', 'Pays multiples', 'P??rou', 'Philippines', 'Pitcairn', 'Pologne', 'Polyn??sie fran??aise', 'Porto Rico', "Portugal", 'Qatar', 'R??publique arabe syrienne', 'R??publique centrafricaine', 'R??union', 'Roumanie', "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord", 'Russie, F??d??ration de', 'Rwanda', 'Sahara occidental', 'Saint-Barth??lemy', 'Saint-Kitts-et-Nevis', 'Saint-Marin', 'Saint-Martin (partie fran??aise)', "Saint-Martin (partie n??erlandaise)", 'Saint-Pierre-et-Miquelon', 'Saint-Si??ge', 'Saint-Vincent-et-les-Grenadines', 'Sainte-H??l??ne, Ascension et Tristan da Cunha', 'Sainte-Lucie', 'Salomon, Iles', 'Samoa', 'Samoa am??ricaines', 'Sao Tom??-et-Principe', 'S??n??gal', 'Serbie', "Seychelles", 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slov??nie', 'Somalie', 'Soudan', 'Soudan du Sud', 'Sri Lanka', 'Su??de', 'Suisse', "Suriname", 'Svalbard et ??le Jan Mayen', 'Swaziland', 'Tadjikistan', 'Ta??wan, Province de Chine', 'Tanzanie, R??publique unie de', 'Tchad', 'Tch??coslovaquie', 'Tch??que, R??publique', 'Terres australes fran??aises', 'Tha??lande', 'Timor-Leste', "Togo", 'Tokelau', 'Tonga', 'Trinit??-et-Tobago', 'Tunisie', 'Turkm??nistan', 'Turks-et-Ca??cos (??les)', 'Turquie', 'Tuvalu', 'Ukraine', 'URSS', 'Uruguay', "Vanuatu", 'Vatican : voir Saint-Si??ge', 'Venezuela (R??publique bolivarienne du)', 'Viet Nam', 'Viet Nam (Sud)', 'Wallis et Futuna', 'Y??men', 'Yougoslavie', 'Za??re', 'Zambie', 'Zimbabwe'];

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

    //MaJ le formulaire ?? partir des valeurs du service
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

    //D??sactiver champs de saisie
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
