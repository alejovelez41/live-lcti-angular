import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind, notes } from 'src/app/shared/interfaces/individu.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';

@Component({
  selector: 'app-notes-event',
  templateUrl: './notes-event.component.html',
  styles: [
  ]
})
export class NotesEventComponent implements OnInit {
  individu!: Ind;
  entreprise!: Entreprise;
  entreprises: Entreprise[] = [];
  controle!: Controle;

  date: any;
  time: any;

  notes!: notes[];

  idCont !: string | number;
  idEnt !: string | number;
  idInd !: string | number;

  monFormulaire: FormGroup = this.fb.group({
    note: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService, 
    private dataService: DataService,
    private controleService: ControleService
  ) { }

  enregistrer(){    
    console.log('enregistrement Ent called')
    let newNote : notes ={
      "heure" : "",
      "note" : "",
      "nom" : ""
    };
    newNote.heure = this.obtenirHeure(new Date());
    newNote.note = this.monFormulaire.controls['note'].value;
    this.controle.notesCont.push(newNote);
    this.controleService.setControle(this.controle);
    this.monFormulaire.controls['note'].setValue('');
    this.controleService.editerControle(this.controle).subscribe(resp => {
      console.log(resp)
    });
  }

  efffacerNote(){
    this.monFormulaire.controls['note'].setValue('');
  }

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
  }


  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    if (this.individu) {this.idInd = this.individu.id} else { this.idInd = ''}

    this.entreprises =  this.entrepriseService.getSocietes();
    if (this.individu) {this.idEnt = this.individu.idEnt} else if (this.entreprise) {this.idEnt = this.entreprise.id} else { this.idEnt = ''};
    if(this.individu){this.entreprise =  this.entrepriseService.sociteById(this.idEnt);} 
    else{this.entreprise =  this.entrepriseService.getDataEntreprise()}

    this.controle = this.controleService.getControle();    
    if (this.controle) {this.idCont = this.controle.id} else { this.idCont = ''}    

    console.log('boite à outils',this.controle);
  }

}
