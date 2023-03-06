import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cardNote, notes } from 'src/app/shared/interfaces/individu.interface';
import { environment } from '../../../environments/environment';
import { Entreprise } from '../../shared/interfaces/entreprises.interface';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiUrl: string = environment.apiEndpoint;
  
  dataEntreprise !: Entreprise ;
  entreprises: Entreprise[] = [];
  creationFiche : boolean = false;
  alerteFiche: boolean = false;

  noteDefault: cardNote[] =[];

  constructor(private http: HttpClient) { }

  sociteById(idEnt : string|number){
    let aux: any =''
    this.entreprises.forEach( ent=> {
      
      if(ent.id == idEnt){
        aux = ent;
      };
    });
    if(aux == ''){
      aux = this.getEntrepriseById(idEnt);
    };
    return aux;
  }

  getEntreprises() {
    return  this.http.get<Entreprise[]>(`${this.apiUrl}/entreprises`)
  }
  getEntrepriseById(id: string|number) {
    console.log(`${this.apiUrl}/entreprises/${id}`)
    return this.http.get<Entreprise>(`${this.apiUrl}/entreprises/${id}`)
  }
  ajouterEntreprise(entreprise: Entreprise){
    return this.http.post<Entreprise>(`${this.apiUrl}/entreprises`,entreprise)
  }
  editerEntreprise(entreprise: Entreprise){
    console.log('EDITION EN COURS')
    console.log(entreprise)
    console.log(`${this.apiUrl}/entreprises/${entreprise.id}`)
    return this.http.put<Entreprise>(`${this.apiUrl}/entreprises/${entreprise.id}`,entreprise)
  }

  setSocietes(societe : Entreprise[]){
    this.entreprises = societe;
  }

  getSocietes(){
    return this.entreprises;
  }
  getCreationFiche(){
    return this.creationFiche;
  }
  setAlerteFiche(val : boolean){
    this.alerteFiche = val;
  }
  
  getAlerteFiche(){
    return this.alerteFiche;
  }
  setCreationFiche(val : boolean){
    this.creationFiche = val;
  }

  effacerEntreprise(id: string|number){
    return this.http.delete<Entreprise>(`${this.apiUrl}/entreprises/${id}`)
  }
  setEntreprise(ent : Entreprise) {
    this.dataEntreprise = ent;
  };
  getDataEntreprise() {
    return this.dataEntreprise;
  }
  getNouvelleEntreprise() {
    let ent: Entreprise = {
      "id": "",
      "siren_fiche": "",
      "denomination": "",
      "adresse_siege": "",
      "dirigent": "",
      "date_dirigeant": "",
      "lieu_dirigeant": "",
      "notes_societe":  "",
      "date" : "",
      "archive": false,
      "id_individus": [],
      "notes_outils":  this.noteDefault,
    };
    return ent;
  }
  setIdIndividu(id:string|number) {
    console.log("includes id ? ", this.dataEntreprise.id_individus.includes(id))
    if (!this.dataEntreprise.id_individus.includes(id)){
      this.dataEntreprise.id_individus.push(id);
    }
    console.log(this.dataEntreprise.id_individus)
    
  }
  resetEntreprise(){
    let ent: Entreprise = {
      "id": "",
      "siren_fiche": "",
      "denomination": "",
      "adresse_siege": "",
      "dirigent": "",
      "date_dirigeant": "",
      "lieu_dirigeant": "",
      "notes_societe":  "",
      "date" : "",
      "archive": false,
      "id_individus": [],
      "notes_outils":  this.noteDefault,
    };
    this.dataEntreprise = ent;
  }


  //methodes formulaire

  set newData(val: Entreprise) {
    this.dataEntreprise = val;
  }

}
