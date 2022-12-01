import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cardNote, noms } from 'src/app/shared/interfaces/individu.interface';
import { OutilsService } from '../../services/outils.service';
import { Controle } from '../../../shared/interfaces/controle.interface';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { Ind } from '../../../shared/interfaces/individu.interface';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styles: [
  ]
})
export class EditNoteComponent implements OnInit {

  allNotes : cardNote[] = [];
  allNoms : noms[] = [];
  noteOriginal : cardNote = {heure : '', note : '', type : '', id : '', titre : '', nom : ''};
  note: cardNote = {heure : '', note : '', type : '', id : '', titre : '', nom : ''};
  mesNoms : string[] = [];

  monFormulaire: FormGroup = this.fb.group({
    titre_note: ['', [Validators.required]],
    note: ['', [Validators.required]],
    nom: ['', [Validators.required]],
    heure: ['', [Validators.required]],
  })

  constructor(
    private outilsService : OutilsService,
    public modalService: NgbActiveModal,
    private fb: FormBuilder,
    private router : Router
  ) { }
  
  changeNom(){

  };

  enregistrer(){
    console.log('enregistrer called')

    if(this.note.type == 'evenement'){
      this.outilsService.getControleById(this.note.id).subscribe(cont =>{
        console.log('cont obtenue by id : ', cont);
        let index = 0;
        cont.notesCont.forEach(aux => {
          if(this.noteOriginal.note == aux.note){
            console.log('success ', aux);
            cont.notesCont[index] = this.note;
            this.outilsService.editerControle(cont).
            subscribe(controle => {
              console.log('controle enregistré', controle);
              this.modalService.close('succes');
            });
          }
          index += 1;
        });         
      });
      this.modalService.close('succes');
      
    } else if(this.note.type == 'entreprise'){
      this.outilsService.getEntrepriseById(this.note.id).subscribe(ent =>{
        let index = 0;
        ent.notes_outils.forEach(aux => {
          if(this.noteOriginal.note == aux.note){
            console.log('success ', aux);
            ent.notes_outils[index] = this.note;
            this.outilsService.editerEntreprise(ent).
            subscribe(entreprise => {
              console.log('entreprise enregistré', entreprise);
              this.modalService.close('succes');
            });
          }
          index += 1;
        });        
      });
      this.modalService.close('succes');

    } else if(this.note.type == 'individu'){
      this.outilsService.getIndividuById(this.note.id).subscribe(ind =>{
        let index = 0;
        ind.notesInd.forEach(aux => {
          if(this.noteOriginal.note == aux.note){
            console.log('success ', aux);
            ind.notesInd[index] = this.note;
            this.outilsService.editerIndividu (ind).
            subscribe(individu => {
              console.log('INDIVIDU enregistré', individu);
              this.modalService.close('succes');
            });
          }
          index += 1;
        });        
      });
      this.modalService.close('succes');
    } 
    
    
    
  };

  efffacerNote(){
    this.monFormulaire.controls['note'].setValue('');
    this.changeVal();

  };

  changeVal(){
    this.note.titre = this.monFormulaire.value.titre_note;
    this.note.note = this.monFormulaire.value.note;
    this.note.nom = this.note.type.concat(' - ', this.note.titre);
    this.monFormulaire.controls['nom'].setValue(this.note.nom);
  };

  obtenirHeure(date: Date) {
    return (
      [
      [
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0')
      ].join(':'),
      [
        (date.getDate()).toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear()
      ].join('-')
    ].join(' ')
    );
  };

  ngOnInit(): void {

    this.allNotes = this.outilsService.getAllNotes();
    this.allNoms = this.outilsService.getAllNoms();
    this.noteOriginal = this.outilsService.getNoteOriginal();



    if(this.outilsService.getType() == 'evenement'){
      

      let cont !: Controle;
      cont = this.outilsService.getControle();

      //set nom du note
      this.monFormulaire.controls['nom'].setValue('evenement'.concat(' - ', cont.dt_controle));
      this.monFormulaire.controls['titre_note'].setValue(this.noteOriginal.titre);
      this.monFormulaire.controls['note'].setValue(this.noteOriginal.note);
      
      //assignation pour le formulaire
      this.note.id = cont.id;
      this.note.type = 'evenement';
      this.note.nom = this.noteOriginal.nom;
      this.note.note = this.noteOriginal.note;
      this.note.titre = this.noteOriginal.titre;
      this.note.heure = this.noteOriginal.heure;

    }else if(this.outilsService.getType() == 'entreprise'){      

      let ent !: Entreprise;
      ent = this.outilsService.getEntreprise();
      //set nom du note
      this.monFormulaire.controls['nom'].setValue('entreprise'.concat(' - ', ent.denomination));
      this.monFormulaire.controls['titre_note'].setValue(this.noteOriginal.titre);
      this.monFormulaire.controls['note'].setValue(this.noteOriginal.note);
      // this.monFormulaire.controls['nom'].setValue(ent.denomination);
      //assignation pour le formulaire
      this.note.id = ent.id;
      this.note.type = 'entreprise';
      this.note.nom = this.noteOriginal.nom;
      this.note.note = this.noteOriginal.note;
      this.note.titre = this.noteOriginal.titre;
      this.note.heure = this.noteOriginal.heure;

    }else if(this.outilsService.getType() == 'individu'){
      
      let ind !: Ind;
      console.log('individu dans le servide outils', this.outilsService.getIndividu());
      ind = this.outilsService.getIndividu();
      console.log('id', ind.id);

      //set nom du note
      this.monFormulaire.controls['nom'].setValue('individu'.concat(' - ', ind.nom, ' ', ind.prenom));
      this.monFormulaire.controls['titre_note'].setValue(this.noteOriginal.titre);
      this.monFormulaire.controls['note'].setValue(this.noteOriginal.note);
      //assignation pour le formulaire
      this.note.id = ind.id.toString();
      this.note.type = 'individu';  
      this.note.nom = this.noteOriginal.nom;
      this.note.note = this.noteOriginal.note;
      this.note.titre = this.noteOriginal.titre;
      this.note.heure = this.noteOriginal.heure;      
    }else{
      let ind !: Ind;
      console.log('Accès en dehors de une reference valide');

      //set nom du note
      this.monFormulaire.controls['nom'].setValue(this.noteOriginal.nom);
      this.monFormulaire.controls['titre_note'].setValue(this.noteOriginal.titre);
      this.monFormulaire.controls['note'].setValue(this.noteOriginal.note);
      //assignation pour le formulaire
      this.note.id = this.noteOriginal.id;
      this.note.type = this.noteOriginal.type;  
      this.note.nom = this.noteOriginal.nom;
      this.note.note = this.noteOriginal.note;
      this.note.titre = this.noteOriginal.titre;
      this.note.heure = this.noteOriginal.heure;  
    }

  
    // this.activatedRoute.params
    //   .subscribe( ({id}) => console.log(id));
    // console.log(this.activatedRoute.params);

    console.log('url router', this.router.url)


  }
}
