import { getInstructionStatements } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Entreprise } from '../../shared/interfaces/entreprises.interface';
import { Controle } from '../../shared/interfaces/controle.interface';
import { cardNote, Ind, noms } from '../../shared/interfaces/individu.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutilsService {
  private apiUrl: string = environment.apiEndpoint;

  route : string = '';
  id_note : string | number = '';
  individu !: Ind;
  entreprise !: Entreprise;
  controle !: Controle;
  objectif !: Ind | Entreprise | Controle;
  type : string = '';
  newNote : boolean = false;
  allNotes : cardNote[] = [];
  allNoms : noms[] = [];
  noteOriginal !: cardNote;

  constructor(private http: HttpClient) { }

  createNoteByID(note : cardNote){
    console.log('CreateNoteByID called', note);
    if(note.type == 'evenement'){
      this.getControleById(note.id).subscribe(cont =>{
        cont.notesCont.push(note);
        console.log('edited controle with note',cont);
        this.editerControle(cont).subscribe(controle => {console.log('controle enregistré', controle)}); 
      });
    } else if(note.type == 'entreprise'){
      this.getEntrepriseById(note.id).subscribe(ent =>{
        ent.notes_outils.push(note);
        console.log('edited controle with note',ent);
        this.editerEntreprise(ent).subscribe(entreprise => {console.log('controle enregistré', entreprise)}); 
      });
    } else if(note.type == 'individu'){
      console.log('tESTS 1ST IF INDIVIDU');
      this.getIndividuById(note.id).subscribe(ind =>{
        ind.notesInd.push(note);
        console.log('edited controle with note',ind);
        this.editerIndividu(ind).subscribe(individu => {console.log('ind enregistré', individu)}); 
      });
    }    
  }

  editNoteByID(note : cardNote){
    if(note.type = 'evenement'){
      this.getControleById(note.id).subscribe(cont =>{
        
        if(cont.notesCont.includes(note)){
          const index = cont.notesCont.indexOf(note);
          cont.notesCont[index] = note;
          this.editerControle(cont).subscribe(controleEdited => {console.log('controle edité', controleEdited)});
        }else{

          cont.notesCont.push(note);
          
          

        }
        console.log('tests inclusion note',cont.notesCont.includes(note));

      });
    }
    
  }

  DeleteNoteByID(note : cardNote){
    if(note.type = 'evenement'){
      this.getControleById(note.id).subscribe(cont =>{
        
        if(cont.notesCont.includes(note)){
          const index = cont.notesCont.indexOf(note);
          cont.notesCont[index] = note;
          this.editerControle(cont).subscribe(controleEdited => {console.log('controle edité', controleEdited)});
        }else{

          cont.notesCont.push(note);
          
          

        }
        console.log('tests inclusion note',cont.notesCont.includes(note));

      });
    }
    
  }

  editerControle(cont: Controle) {
    console.log('EDITION EN COURS', cont);
    return this.http.put<Controle>(`${this.apiUrl}/controles/${cont.id}`, cont);
  };

  getControleById(id: string | number){
    return this.http.get<Controle>(`${this.apiUrl}/controles/${id}`);
  }

  editerEntreprise(entreprise: Entreprise){
    console.log('EDITION Etreprise eN COURS', entreprise);
    return this.http.put<Entreprise>(`${this.apiUrl}/entreprises/${entreprise.id}`,entreprise)
  }

  getEntrepriseById(id: string | number){
    return this.http.get<Entreprise>(`${this.apiUrl}/entreprises/${id}`);
  }

  editerIndividu(individu: Ind){
    console.log('EDITION IND EN COURS', individu);
    return this.http.put<Ind>(`${this.apiUrl}/individus/${individu.id}`,individu)
  }

  getIndividuById(id: string | number){
    console.log('getIndByID called', `${this.apiUrl}/individus/${id}`);
    return this.http.get<Ind>(`${this.apiUrl}/individus/${id}`);
  }

  getNoteOriginal() {
    return this.noteOriginal;
  }

  setNoteOriginal(n :cardNote) {
    this.noteOriginal = n;
  }

  getRoute() {
    return this.route;
  }

  setRoute(r :string) {
    this.route = r;
  }

  getIdNote() {
    return this.id_note;
  }

  setIdNote(id :string | number) {
    this.id_note = id;
  }


  getIndividu() {
    return this.individu;
  }

  setIndividu(ind : Ind ) {
    this.individu = ind;
  }

  setEntreprise(ent : Entreprise ) {
    this.entreprise = ent;
  }

  getEntreprise() {
    return this.entreprise;
  }

  getControle() {
    return this.controle;
  }

  setControle(cont : Controle) {
    this.controle = cont;
  }

  getType() {
    return this.type;
  }

  setType(typ : string) {
    this.type = typ;
  }

  resetObjectif(){
    this.objectif != undefined;
  }

  getNewNote(){
    return this.newNote;
  }

  setNewNote(n : boolean) {
    this.newNote = n;
  }

  getAllNotes(){
    return this.allNotes;
  }

  setAllNotes(notes : cardNote[]) {
    this.allNotes = notes;
  }

  getAllNoms(){
    return this.allNoms;
  }

  setAllNoms(noms : noms[]) {
    this.allNoms = noms;
  }




  

}

// types : string[] = ['Toutes mes notes', 'evenement', 'entreprise', 'individu'];