import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { cardNote, Ind } from 'src/app/shared/interfaces/individu.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { OutilsService } from '../../services/outils.service';
import { NewNoteComponent } from '../new-note/new-note.component';
import { noms } from '../../../shared/interfaces/individu.interface';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { DeleteNoteComponent } from '../delete-note/delete-note.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styles: [
  ]
})
export class NotesComponent implements OnInit {
  individus: Ind[] = [];
  individu!: Ind;

  routeArriere: string = '';

  id_note : string | number ='';

  allNotes : cardNote[] = [];
  allNoms : noms[] = [];
  mesNotes : cardNote[] = [];
  mesNoms : string[] = [];

  entreprises: Entreprise[] = [];
  entreprise!: Entreprise;
  
  controles: Controle[] = [];
  controle!: Controle;

  types : string[] = ['Toutes mes notes', 'evenement', 'entreprise', 'individu'];

  monFormulaire: FormGroup = this.fb.group({
    type_note: ['', [Validators.required]],
    nom: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private router :  Router,
    private modalService: NgbModal,
    private outilsService : OutilsService,
    private entrepriseService: EntrepriseService, 
    private dataService: DataService,
    private controleService: ControleService
  ) { }
  
  revenirArriere(){
    this.router.navigate([this.routeArriere]);
  }

  ouvrirModalNouvelleNote(id : string | number) {
    this.outilsService.setIdNote(id);
    this.outilsService.setNewNote(true);
    const modalRef = this.modalService.open(NewNoteComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      console.log('data : ', data);
      if (data && data === 'Cross click') {
        console.log('Obtained Data :', data);
        return
      } else if (data){
        console.log('SuccessVar Data :', data);
        this.chargerNotes();
        return
      }
      });
  }

  ouvrirModalPriseNotes(note : cardNote) {
    this.outilsService.setNoteOriginal(note);
    this.outilsService.setNewNote(false);
    const modalRef = this.modalService.open(EditNoteComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      console.log('data : ', data);
      if (data && data === 'Cross click') {
        console.log('Obtained Data :', data);
        return
      } else if (data){
        console.log('SuccessVar Data :', data);
        this.chargerNotes();
        return
      }
    });
    
  }


  ouvrirModalDeleteNotes(note : cardNote) {
    this.outilsService.setNoteOriginal(note);
    this.outilsService.setNewNote(false);
    const modalRef = this.modalService.open(DeleteNoteComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      console.log('data : ', data);
      if (data && data === 'Cross click') {
        console.log('Obtained Data :', data);
        return
      } else if (data == 'non'){
        console.log('Result non');
        this.chargerNotes();
        return
      } else if (data == 'oui'){
        
        console.log('enregistrer called')

        if(note.type == 'evenement'){
          this.outilsService.getControleById(note.id).subscribe(cont =>{
            console.log('cont obtenue by id : ', cont);
            let index = 0;
            cont.notesCont.forEach(aux => {
              if(note.note == aux.note){
                console.log('success ', aux);
                cont.notesCont.splice(index,1);
                console.log('Deleted note', cont);
                this.outilsService.editerControle(cont).
                subscribe(controle => {
                  console.log('controle enregistré', controle);
                  this.chargerNotes();
                });
              }
              index += 1;
            });         
          });
        }
        if(note.type == 'entreprise'){
          this.outilsService.getEntrepriseById(note.id).subscribe(ent =>{
            console.log('ent obtenue by id : ', ent);
            let index = 0;
            ent.notes_outils.forEach(aux => {
              if(note.note == aux.note){
                console.log('success ', aux);
                ent.notes_outils.splice(index,1);
                console.log('Deleted note', ent);
                this.outilsService.editerEntreprise(ent).
                subscribe(entreprise => {
                  console.log('controle enregistré', entreprise);
                  this.chargerNotes();
                });
              }
              index += 1;
            });         
          });
        }
        if(note.type == 'individu'){
          this.outilsService.getIndividuById(note.id).subscribe(ind =>{
            console.log('cont obtenue by id : ', ind);
            let index = 0;
            ind.notesInd.forEach(aux => {
              if(note.note == aux.note){
                console.log('success ', aux);
                ind.notesInd.splice(index,1);
                console.log('Deleted note', ind);
                this.outilsService.editerIndividu(ind).
                subscribe(individu => {
                  console.log('controle enregistré', individu);
                  this.chargerNotes();
                });
              }
              index += 1;
            });         
          });
        }
        
        return
      }
      
    });
    
  }

  deleteNote(){
    
  }

  recupNotes(){
    this.allNotes = [];
    this.allNoms = [];

    this.controles.forEach(cont => {      
      const aux : noms = { id : cont.id, nom : 'evenement'.concat(' - ', cont.nomControle) };
      this.allNoms.push(aux);
      console.log('Entered in controles loop');  
      if (cont.notesCont) {    
        cont.notesCont.forEach(noteCont => {
          console.log('Note controle : ', noteCont);
          let note: cardNote = {heure : '', note : '', type : '', id : '', titre : '', nom : ''};
          note.heure = noteCont.heure;
          note.note  = noteCont.note;
          note.type  = 'evenement';
          note.id    = noteCont.id;
          note.titre   = noteCont.titre;
          note.nom   = noteCont.nom;
          //Puch note to the notes array
          this.allNotes.push(note);          
        });        
      }      
    });

    this.entreprises.forEach(ent => { 
      const aux : noms = { id : ent.id, nom : 'entreprise'.concat( ' - ', ent.denomination ) };
      this.allNoms.push(aux);
      console.log('Entered in entreprises loop');  
      if (ent.notes_outils) {
        ent.notes_outils.forEach(noteEnt => {
          let note: cardNote = {heure : '', note : '', type : '', id : '', titre : '', nom : ''};
          note.heure =noteEnt.heure;
          note.note =noteEnt.note;
          note.type = 'entreprise';
          note.id = ent.id;
          note.titre = noteEnt.titre;
          note.nom = noteEnt.nom;
          //Puch note to the notes array
          this.allNotes.push(note);
        });        
      }      
    });

    this.individus.forEach(ind => {   
      const aux : noms = { id : ind.id, nom : 'individu'.concat( ' - ', ind.nom, ' ', ind.prenom)  };
          this.allNoms.push(aux);     
      if (ind.notesInd) {
        ind.notesInd.forEach(noteInd => {
          let note: cardNote = {heure : '', note : '', type : '', id : '', titre : '', nom : ''};
          note.heure =noteInd.heure;
          note.note =noteInd.note;
          note.type = 'individu';
          note.id = ind.id;
          note.titre = noteInd.titre;
          note.nom = noteInd.nom;
          //Puch note to the notes array
          this.allNotes.push(note);          
        });        
      }      
    });
    
    console.log('RecupNotes called, result : ', this.allNotes)

    console.log('All Noms, result : ', this.allNoms)
    
    this.outilsService.setAllNotes(this.allNotes);

    this.outilsService.setAllNoms(this.allNoms);
  }

  changeVal(){
    if(this.monFormulaire.value.type_note == 'Toutes mes notes'){
      this.monFormulaire.controls['nom'].setValue('');
      this.mesNotes = this.allNotes;
      this.mesNotes.forEach(note => {
        (!this.mesNoms.includes(note.nom) ? this.mesNoms.push(note.nom) : '');
      });
    }else{
      this.mesNotes = [];
      this.mesNoms = [];
      this.monFormulaire.controls['nom'].setValue('');
      this.allNotes.forEach(note => {
        if(note.type == this.monFormulaire.value.type_note){
          this.mesNotes.push(note);
          (!this.mesNoms.includes(note.nom) ? this.mesNoms.push(note.nom) : '');
        }
      });
    }
    console.log('changeVal', this.mesNotes);
    console.log('noms change val', this.mesNoms);
  }
  test(){
    console.log('hello');
  }

  changeNom(){
    console.log('debut changeNom', this.monFormulaire.value.nom)
    console.log(this.monFormulaire.controls['nom'].value );
    if(this.monFormulaire.value.nom == ''){
      this.changeVal();
    }else{
      this.mesNotes = [];
      let type : string = '';
      // this.monFormulaire.controls['type_note'].setValue(note_choisi.type);
      this.allNotes.forEach(note => {
        if(note.nom == this.monFormulaire.value.nom){
          this.mesNotes.push(note);
          type = note.type;
        }
      });
      this.monFormulaire.controls['type_note'].setValue(type);
    }
    console.log('changeNom', this.mesNotes)

  }

  findControles() {
    
    // this.controles = this.controleService.getControlesTest() ;
  }

  chargerNotes(){
    this.controleService.getControles().
    subscribe(conts => {
      this.controles = conts;
      console.log('controless query', this.controles);
      this.entrepriseService.getEntreprises().
        subscribe(ents => {
          this.entreprises = ents;
          console.log('entreprises query: ', this.entreprises)
          this.dataService.getIndividus().
            subscribe(inds => {
              this.individus = inds;
              console.log('individus query: ', this.individus);
              this.recupNotes();
              this.monFormulaire.controls['type_note'].setValue('Toutes mes notes');
              this.changeVal();
            })
        })
    });
  }

  ngOnInit(): void {
    this.routeArriere = this.outilsService.getRoute();
    // this.findControles();
    console.log('controless query', this.controles);
    // async this.controleService.getControles().subscribe( async(resp) => { this.controles = await resp; console.log('contoroles query: ', resp)} );

    // this.controleService.getControles().subscribe( async(resp) => { this.controles = await resp; console.log('contoroles query: ', resp)} );

    // this.controleService.getControles().then( (resp) => { this.controles = resp; console.log('contoroles query: ', resp)} );
    
    // this.controles = this.controleService.getControles().then( (resp)  => {})
    // console.log('contoroles query: ', this.controles);
    this.chargerNotes();


    this.id_note = this.outilsService.getIdNote();

    // this.entrepriseService.getEntreprises().subscribe( async(resp) => { this.entreprises = await resp; console.log('entreprises query: ', resp)} );
    // this.dataService.getIndividus().subscribe( async(resp) => { this.individus = await resp; console.log('individus query: ', resp)} ); 
    
  }

}
