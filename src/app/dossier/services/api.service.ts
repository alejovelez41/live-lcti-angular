import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { cardNote, notes } from 'src/app/shared/interfaces/individu.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  noteDefault: cardNote[] =[];

  controle: Controle = {
    id:"" ,
    nomControle: "",
    newControle: true,
    etat: "",
    dt_controle: "",
    hr_controle: "",
    lieu_controle:"",
    inspecteurs_controle: [],
    partenaires_controle: [],
    entreprises_controle: [],
    individus_controle: [],
    notesCont : this.noteDefault
    
  };

  constructor(private http: HttpClient) { }

  getControles() {
    return this.http.get<Controle[]>('http://localhost:3000/controles')
  }
  getControleById(id: string | number) {
    return this.http.get<Controle>(`http://localhost:3000/controles/${id}`)
  }
  ajouterControle(controle: Controle) {
    return this.http.post<Controle>('http://localhost:3000/controles', controle)
  }
  editerControle(cont: Controle) {
    console.log('EDITION EN COURS')
    console.log(cont)
    console.log(`http://localhost:3000/controles/${cont.id}`)
    return this.http.put<Controle>(`http://localhost:3000/controles/${cont.id}`, cont)
  }

  effacerControle(id: string | number) {
    return this.http.delete<Controle>(`http://localhost:3000/controles/${id}`)
  }

}
