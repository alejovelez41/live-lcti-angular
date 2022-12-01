import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Individu } from '../../shared/interfaces/individus.interface';
import { Ind, horaireJour, notes, cardNote } from '../../shared/interfaces/individu.interface';
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
    "statut": "salarie",
    "fonction": "",
    "nir": "",
    "siret": "",
    "siren": "",
    "civilite": "",
    "dt_naissance": "",
    "lieu_naissance": "",
    "nationalite_fr": "",
    "pays_naissance": "",
    "tel":"",
    "n_voie": "",
    "bis": "",
    "libelle": "",
    "complement": "",
    "cp": "",
    "ville": "",
    "dt_creation": "",
    "type_statut": "",
    "autre_statut": "",
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
    "signature_cloture": "",
    "notesInd": this.noteDefault
  };

  constructor( private http: HttpClient) { }

  getNewIndividu(){
    return this.individuNew;
  }

  setIndividu(ind : Ind){
    this.individu= ind;
  }

  getIndividu(){
    return this.individu;
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
