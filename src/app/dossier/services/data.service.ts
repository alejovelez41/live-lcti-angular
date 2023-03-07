import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { Individu } from '../../shared/interfaces/individus.interface';
import { Ind, horaireJour, notes, cardNote, informations } from '../../shared/interfaces/individu.interface';
import { environment } from '../../../environments/environment';

interface DataItem{
  titre: string;
  valeur: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl: string = environment.apiEndpoint;
  private _nav: boolean[] = [];
  private navChange$ = new Subject<boolean[]>();
  public nav$ = this.navChange$.asObservable();

  navigation = new Observable((observer) =>{
    console.log('Observable navigation called');

  })

  dataIndividu: DataItem[] = []; 
  // newData: Individu[] = this.getHeroes();
  individu!: Ind;
  newJour : horaireJour ={
    "active" : false,
    "debut" : "",
    "fin" : "",
    "pause" : "",
    "total" : "",
  };
  noteDefault: cardNote[] =[];

  newJourActive : horaireJour ={
    "active" : true,
    "debut" : "",
    "fin" : "",
    "pause" : "",
    "total" : "",
  };

  infosDefault: informations = {
    "retour_systeme": false,
    "rei_siren": "",
    "rei_denomination": "",
    "rei_code_naf": "",
    "rei_dt_creation": "",
    "rei_dt_debut": "",
    "rei_voie": "",
    "rei_siret": "",
    "rei_urssaf": "",
    "rei_cp": "",
    "rei_cp_insee": "",
    "rei_comune": "",
    "rei_dt_fin": "",
    "rei_qualite_dir": "",
    "rei_nom": "",
    "rei_prenom": "",
    "rei_dt_naiss": "",
    "rei_lieu_naiss": "",
    "rei_titre": "",
    "rei_num_cext": "",
    "rei_num_cint": "",
    "dpae_siret": "",
    "dpae_nom": "",
    "dpae_prenom": "",
    "dpae_dt_naiss": "",
    "dpae_dt_emb": "",
    "dpae_hr_emb": "",
    "dpae_dt_decl": "",
    "dpae_hr_decl": "",
    "dsn_adresse": "",
    "dsn_activite": "",
    "dsn_contrat": "",
    "dsn_dt_emb": "",
    "dsn_duree": "",
    "dsn_s_brut": "",
    "dsn_dernier_mois": "",
    "dsn_total": "",
    "dsn_nom": "",
    "dsn_prenom": "",
    "dsn_dt_naiss": "",
    "dsn_debut_contrat": "",
    "dsn_nir": "",
    "obp7_num_compte": "",
    "obp7_to": "",
    "obp7_periode": "",
    "caae_num_compte": "",
    "caae_periodes": "",
    "caae_ca": "",
    "opc_num_intervention": "",
    "opc_dt_creation": "",
    "opc_realisateur": "",
    "opc_action": "",
    "opc_pilote": "",
    "opc_delegue": "",
    "opc_etat": "",
    "opc_dt_etat": ""
  }

  individuNew : Ind = {
    "id": "",
    "refus": false,
    "consentement": false,
    "archived": false, 
    "date": "",
    "heure": "",
    "description" : "",
    "nom": "",
    "prenom": "",
    "typePI" : "",
    "numeroPI" : "",
    "signature": "",
    "statut": "",
    "fonction": "",
    "nir": "",
    "type_statut": "",
    "dt_creation": "",
    "autre_statut": "",
    "siret": "",
    "siren": "",
    "civilite": "",
    "dt_naissance": "",
    "lieu_naissance": "",
    "nationalite_fr": "",
    "pays_naissance": "",
    "tel":"",
    "adresse_perso": "",
    "cp_perso": "",
    "ville_perso": "",
    "difference_adresse": false,
    "adresse_pro": "",
    "cp_pro": "",
    "ville_pro": "",
    "emploi": "",
    "contrat": "",
    "interimaire": false,
    "sirenI": "",
    "denominationI": "",
    "adresse_siegeI": "",
    "dt_embauche": "",
    "duree": "",
    "bullentins": "",
    "hsup": "",
    "sbrut": "",
    "fsalaire": "",
    "montant": "",
    "remunere": "",
    "ca": "",
    "rmensuelle": "",
    "snombre": "",
    "total": "",
    "identites": "",
    "soustraitant": "",
    "identite_do": "",
    "s_partie_activite": "",
    "id_soustraitants": "",
    "lundi": this.newJourActive,
    "mardi": this.newJourActive,
    "mercredi": this.newJourActive,
    "jeudi": this.newJourActive,
    "vendredi": this.newJourActive,
    "samedi": this.newJour,
    "dimanche": this.newJour,
    "lundiSup": this.newJour,
    "mardiSup": this.newJour,
    "mercrediSup": this.newJour,
    "jeudiSup": this.newJour,
    "vendrediSup": this.newJour,
    "samediSup": this.newJour,
    "dimancheSup": this.newJour,
    "totalSem": "",
    "replique": this.newJour,
    "idEnt": "",
    "denominationEnt": "",
    "siren_fiche": "",
    "adresse_siege": "",
    "idEntPerso": "",
    "denominationEntPerso": "",
    "siren_fichePerso": "",
    "adresse_siegePerso": "",
    "signature_cloture": "",
    "refus_signature": false,
    "notesInd": this.noteDefault,
    "infos": this.infosDefault,
  };

  constructor( private http: HttpClient) { }

  setnav(val : boolean[]){
    this._nav = val;
    this.navChange$.next(val);
  };

  getnav(){
    return this._nav;
  };

  getNewIndividu(){
    return this.individuNew;
  }

  setIndividu(ind : Ind){
    this.individu= ind;
  }

  setNavigation(val : boolean[]){
     
  }

  getIndividu(){
    return this.individu;
  }
  
  getInfosByNir(individu: Ind){
    return this.http.get<informations>(`${this.apiUrl}/infos/nir/${individu.nir}`)
  }
  getIndividus() {
    return this.http.get<Ind[]>(`${this.apiUrl}/individus`)
  }
  getIndividuById(id: string|number) {
    return this.http.get<Ind>(`${this.apiUrl}/individus/${id}`)
  }
  ajouterIndividu(individu: Ind){
    return this.http.post<Ind>(`${this.apiUrl}/individus`,individu)
  }
  ajouterIndividus(individus: any){
    return this.http.post<any>(`${this.apiUrl}/individus`,individus)
  }
  editerIndividu(individu: Ind){
    console.log('EDITION EN COURS')
    console.log(individu)
    console.log(`${this.apiUrl}/individus/${individu.id}`)
    return this.http.put<Ind>(`${this.apiUrl}/individus/${individu.id}`,individu)
  }

  effacerIndividu(id: string|number){
    return this.http.delete<Ind>(`${this.apiUrl}/individus/${id}`)
  }

}
