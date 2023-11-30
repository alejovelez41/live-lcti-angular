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

  private notification = new Subject<boolean>();

  private affichage = new Subject<boolean>();

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
    "retour_systeme": "",
    "rei_siret": "",
    "rei_lib_voie": "",
    "rei_no_voie": "",
    "rei_rep_voie": "",
    "rei_typ_voie": "",
    "rei_base_urssaf": "",
    "rei_cp": "",
    "rei_comune": "",
    "rei_dt_fin": "",
    "rei_siren": "",
    "rei_denomination": "",
    "rei_dt_creation": "",
    "rei_dt_debut": "",
    "rei_qualite_dir": "",
    "rei_nom": "",
    "rei_prenom": "",
    "rei_dt_naiss": "",
    "rei_lieu_naiss": "",
    "rei_titre": "",
    "rei_num_cext": "",
    "rei_num_cint": "",
    "dpae_nom": "",
    "dpae_prenom": "",
    "dpae_dt_naiss": "",
    "dpae_dt_emb": "",
    "dpae_dt_decl": "",
    "nir": "",
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
    "obp7_to": "",
    "obp7_periode": "",
    "caae_periode_1": "",
    "caae_periode_2": "",
    "caae_periode_3": "",
    "caae_periode_4": "",
    "caae_periode_5": "",
    "caae_periode_6": "",
    "caae_periode_7": "",
    "caae_periode_8": "",
    "caae_periode_9": "",
    "caae_periode_10": "",
    "caae_periode_11": "",
    "caae_periode_12": "",
    "caae_ca_1": "",
    "caae_ca_2": "",
    "caae_ca_3": "",
    "caae_ca_4": "",
    "caae_ca_5": "",
    "caae_ca_6": "",
    "caae_ca_7": "",
    "caae_ca_8": "",
    "caae_ca_9": "",
    "caae_ca_10": "",
    "caae_ca_11": "",
    "caae_ca_12": "",
    "opc_num_intervention": "",
    "opc_realisateur": "",
    "opc_dt_creation": "",
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
    "typeVersement": "",
    "autreVersement": "",  
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

  setNotification(val : boolean) {
    this.notification.next(val);
  }

  getNotification(): Observable<boolean>{ 
    return this.notification.asObservable();
  }

  setAffichage(val : boolean) {
    this.affichage.next(val);
  }

  getAffichage(): Observable<boolean>{ 
    return this.affichage.asObservable();
  }

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
