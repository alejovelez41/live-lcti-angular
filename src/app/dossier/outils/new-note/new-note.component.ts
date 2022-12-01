import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cardNote, noms } from 'src/app/shared/interfaces/individu.interface';
import { OutilsService } from '../../services/outils.service';
import { Controle } from '../../../shared/interfaces/controle.interface';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { Ind } from '../../../shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styles: [
  ]
})
export class NewNoteComponent implements OnInit {

  allNotes : cardNote[] = [];
  allNoms : noms[] = [];
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
    private router : Router,
    public dataService : DataService,
  ) { }

  changeNom(){
    console.log('changeNom called');
    console.log(this.monFormulaire.controls['nom'].value);

    //Set note value
    this.note.id = this.monFormulaire.controls['nom'].value;
    this.allNoms.forEach(ref => {
      const aux = this.monFormulaire.controls['nom'].value;
      if(ref.id == aux){
        this.note.nom = ref.nom;
        const aux = this.note.nom.split(' - ');
        this.note.type = aux[0];
      }
    })

  };

  createNoteById(note : cardNote){
    console.log('CreateNoteByID called', note);
    if(note.type == 'evenement'){
      this.outilsService.getControleById(note.id).subscribe(cont =>{
        cont.notesCont.push(note);
        console.log('edited controle with note',cont);
        this.outilsService.editerControle(cont).subscribe(controle => {
          console.log('controle enregistré', controle);
          this.modalService.close('succes');
        }); 
      });
    } else if(note.type == 'entreprise'){
      this.outilsService.getEntrepriseById(note.id).subscribe(ent =>{
        ent.notes_outils.push(note);
        console.log('edited controle with note',ent);
        this.outilsService.editerEntreprise(ent).subscribe(entreprise => {
          console.log('controle enregistré', entreprise);
          this.modalService.close('succes');
        }); 
      });
    } else if(note.type == 'individu'){
      console.log('tESTS 1ST IF INDIVIDU');
      this.outilsService.getIndividuById(note.id).subscribe(ind =>{
        ind.notesInd.push(note);
        console.log('edited controle with note',ind);
        this.outilsService.editerIndividu(ind).subscribe(individu => {
          console.log('ind enregistré', individu);
          this.dataService.setIndividu(individu);
          this.modalService.close('succes');
        }); 
      });
    }  
  }

  enregistrer(){
    console.log('enregistrer called');

    this.note.heure = this.obtenirHeure(new Date());
    this.createNoteById(this.note);
  };

  efffacerNote(){
    this.monFormulaire.controls['note'].setValue('');
    this.changeVal();

  };

  changeVal(){
    this.note.titre = this.monFormulaire.value.titre_note;
    this.note.note = this.monFormulaire.value.note;
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

    if(this.outilsService.getNewNote()){

      console.log('Init route' , this.outilsService.getRoute());
      console.log('OnInit modale new Type' , this.outilsService.getType());

      //obtenir id pour le note
      if(this.outilsService.getType() == 'evenement'){
        console.log('assignation contrl');
        let cont !: Controle;
        cont = this.outilsService.getControle();
        //assignation pour le formulaire
        this.note.id = cont.id;
        this.note.type = 'evenement';
        this.note.nom = this.note.type.concat(' - ', cont.nomControle);
        this.monFormulaire.controls['nom'].setValue(this.note.nom);
      }else if(this.outilsService.getType() == 'entreprise'){
        console.log('assignation ent');
        let ent !: Entreprise;
        ent = this.outilsService.getEntreprise();
        //assignation pour le formulaire
        this.note.id = ent.id;
        this.note.type = 'entreprise';
        this.note.nom = this.note.type.concat(' - ', ent.denomination);
        this.monFormulaire.controls['nom'].setValue(this.note.nom);
      }else if(this.outilsService.getType() == 'individu'){
        console.log('assignation ind');
        let ind !: Ind;
        console.log(this.outilsService.getIndividu());
        ind = this.outilsService.getIndividu();
        console.log('id', ind.id);
        //assignation pour le formulaire
        this.note.id = ind.id.toString();
        this.note.type = 'individu';
        this.note.nom = this.note.type.concat(' - ', (ind.nom.concat(' ', ind.prenom)));
        this.monFormulaire.controls['nom'].setValue(this.note.nom);
        
      }
    }
    else{//edition de note
      //obtenir id pour le note
      if(this.outilsService.getType() == 'evenement'){
        let cont !: Controle;
        cont = this.outilsService.getControle();
        this.monFormulaire.controls['nom'].setValue(cont.etat);
        //assignation pour le formulaire
        this.note.id = cont.id;
        this.note.type = 'evenement';
      }else if(this.outilsService.getType() == 'entreprise'){
        let ent !: Entreprise;
        ent = this.outilsService.getEntreprise();
        this.monFormulaire.controls['nom'].setValue(ent.denomination);
        //assignation pour le formulaire
        this.note.id = ent.id;
        this.note.type = 'evenement';
      }else if(this.outilsService.getType() == 'individu'){
        let ind !: Ind;
        console.log(this.outilsService.getIndividu());
        ind = this.outilsService.getIndividu();
        console.log('id', ind.id);
        this.monFormulaire.controls['nom'].setValue(ind.nom.concat(' ', ind.prenom));
        //assignation pour le formulaire
        this.note.id = ind.id.toString();
        this.note.type = 'evenement';
        
      }

    }
    // this.activatedRoute.params
    //   .subscribe( ({id}) => console.log(id));
    // console.log(this.activatedRoute.params);

    console.log('url router', this.router.url)


  }

}

// types : string[] = ['Toutes mes notes', 'evenement', 'entreprise', 'individu'];