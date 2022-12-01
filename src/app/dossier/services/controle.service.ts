import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { cardNote, Ind, notes } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { Controle, Inspecteur, Partenaire } from '../../shared/interfaces/controle.interface';
import { environment } from '../../../environments/environment';
// import { threadId } from 'worker_threads';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Request-Headers' : '*',
    'api-key': 'nHd8pXjRLEajZAJ6vqjZ3wikUAZKMImGwA6OouaCkhcFIcj86H8HT1Krl0VIbxsa'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ControleService {

  
  //Mongo key : nHd8pXjRLEajZAJ6vqjZ3wikUAZKMImGwA6OouaCkhcFIcj86H8HT1Krl0VIbxsa

  // var axios = require('axios');
  // var data = JSON.stringify({
  //   "collection": "<COLLECTION_NAME>",
  //   "database": "<DATABASE_NAME>",
  //   "dataSource": "Live-Lcti",
  //   "projection": {
  //     "_id": 1
  //   }
  // });

  // var config = {
  //   method: 'post',
  //   url: 'https://data.mongodb-api.com/app/data-uqcty/endpoint/data/v1/action/findOne',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Request-Headers': '*',
  //     'api-key': 'nHd8pXjRLEajZAJ6vqjZ3wikUAZKMImGwA6OouaCkhcFIcj86H8HT1Krl0VIbxsa',
  //   },
  //   data: data
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  private apiUrl: string = environment.apiEndpoint;

  noteDefault: cardNote[] =[];

  controle: Controle = {
    id: "",
    nomControle: "",
    newControle: true,
    etat: "",
    dt_controle: "",
    hr_controle: "",
    lieu_controle: "",
    inspecteurs_controle: [],
    partenaires_controle: [],
    entreprises_controle: [],
    individus_controle: [],
    notesCont: this.noteDefault
  };

  newControle: Controle = {
    id: "",
    nomControle: "",
    newControle: true,
    etat: "default",
    dt_controle: "",
    hr_controle: "",
    lieu_controle: "",
    inspecteurs_controle: [],
    partenaires_controle: [],
    entreprises_controle: [],
    individus_controle: [],
    notesCont: this.noteDefault
  };

  controles: Controle[] = [];
  entreprises: Entreprise[] = [];
  individus: Ind[] = [];

  entreprisePreview!: Entreprise;


  constructor(private http: HttpClient) { }
  

  getNewControle() {
    return this.newControle;
  };
  setControle(cont: Controle) {
    this.controle = cont;
  };
  getControle() {
    return this.controle;
  };

  getControleById(id: string | number) {
    return this.http.get<Controle>(`${this.apiUrl}/controles/${id}`);
  };
  ajouterControle(controle: Controle | any) {
    return this.http.post<Controle>(`${this.apiUrl}/controles`, controle);
  };
  editerControle(cont: Controle) {
    console.log('EDITION EN COURS');
    console.log(cont);
    console.log(`${this.apiUrl}/controles/${cont.id}`);
    return this.http.put<Controle>(`${this.apiUrl}/controles/${cont.id}`, cont);
  };

  effacerControle(id: string | number) {
    return this.http.delete<Controle>(`${this.apiUrl}/controles/${id}`);
  };

  getRegions() {
    return this.regions;
  };
  getPartenaires() {
    return this.partenaires;
  };
  getDataPartenaires() {
    return this.data_partenaires;
  };
  getDataInspecteurs() {
    return this.data_inspecteurs;
  };

  //Getters & Setters Controles, entreprises et Individus
  async getControlesTest() {
    return { await : this.http.get<Controle[]>(`${this.apiUrl}/controles`).toPromise()}
  };

  getControles() {
    return this.http.get<Controle[]>(`${this.apiUrl}/controles`);
  };

  getEntreprises() {
    return this.entreprises;
  }

  getIndividus() {
    return this.individus;
  }

  setControles(conts: Controle[]) {
    this.controles = conts;
  }

  setEntreprises(ents: Entreprise[]) {
    this.entreprises = ents;
  }

  setIndividus(inds: Ind[]) {
    this.individus = inds;
  }

  getEntreprisePreview() {
    return this.entreprisePreview;
  }

  setEntreprisePreview(ent: Entreprise) {
    this.entreprisePreview = ent;
  }

  // data

  inspecteurs: string[] = ['PEDRERO Cristina', 'RIAUD Céline', 'SICART Magali', 'MOLIÉ Vanessa', 'LIGER	Thibaut', 'MOUREUIL	Jean-Christophe', 'DELECROIX	Laurence',
    'EUTROPE	Lénaïk', 'SART	Joss', 'JEANSON MAURIN	Catherine'];
  regions: string[] = ['Aquitaine', 'Centre-Val de Loire', 'Champagne Ardenne', 'Île-de-France', 'Languedoc-Roussillon', 'Pays de la Loire', 'Rhône-Alpes'];

  partenaires: string[] = ['Bcr', 'Caf', 'Carsat', 'Cpam', 'Dgfip', 'Douane', 'Dreal', 'Dreets', 'Gendarmerie', 'Msa', 'PAF', 'Pôle emploi', 'Police', 'Autre partenaire'];

  data_partenaires: Partenaire[] = [
    { control: 'partenaire0', nom: 'Bcr' },
    { control: 'partenaire1', nom: 'Caf' },
    { control: 'partenaire2', nom: 'Carsat' },
    { control: 'partenaire3', nom: 'Cpam' },
    { control: 'partenaire4', nom: 'Dgfip' },
    { control: 'partenaire5', nom: 'Douane' },
    { control: 'partenaire6', nom: 'Dreal' },
    { control: 'partenaire7', nom: 'Dreets' },
    { control: 'partenaire8', nom: 'Gendarmerie' },
    { control: 'partenaire9', nom: 'Msa' },
    { control: 'partenaire10', nom: 'PAF' },
    { control: 'partenaire11', nom: 'Pôle emploi' },
    { control: 'partenaire12', nom: 'Police' },
    { control: 'partenaire13', nom: 'Autre partenaire' }

  ];

  data_inspecteurs: Inspecteur[] = [
    { control: 'inspecteur0', nom: 'CHAUSSON Franck', region: 'Pays de la Loire' },
    { control: 'inspecteur1', nom: 'PEDRERO Cristina', region: 'Pays de la Loire' },
    { control: 'inspecteur2', nom: 'RIAUD Céline', region: 'Pays de la Loire' },
    { control: 'inspecteur3', nom: 'SICART Magalia', region: 'Languedoc-Roussillon' },
    { control: 'inspecteur4', nom: 'MOLIÉ Vanessa', region: 'Centre-Val de Loire' },
    { control: 'inspecteur5', nom: 'LIGER	Thibaut', region: 'Centre-Val de Loire' },
    { control: 'inspecteur6', nom: 'MOUREUIL	Jean-Christophe', region: 'Aquitaine' },
    { control: 'inspecteur7', nom: 'DELECROIX	Laurence', region: 'Rhône-Alpes' },
    { control: 'inspecteur8', nom: 'EUTROPE Lénaïk', region: 'Pays de la Loire' },
    { control: 'inspecteur9', nom: 'SART	Joss', region: 'Champagne Ardenne' },
    { control: 'inspecteur10', nom: 'JEANSON MAURIN	Catherine', region: 'Champagne Ardenne' }
  ];
}

