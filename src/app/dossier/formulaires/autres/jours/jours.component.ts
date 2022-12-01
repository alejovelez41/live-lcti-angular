import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/dossier/services/data.service';
import { horaireJour, Ind } from 'src/app/shared/interfaces/individu.interface';

@Component({
  selector: 'app-jours',
  templateUrl: './jours.component.html',
  styles: [
  ]
})
export class JoursComponent implements OnInit {
  individu!: Ind;

  monFormulaire: FormGroup = this.fb.group({
    h_lun: [ true, [ Validators.required ]],
    h_mar: [ true, [ Validators.required ]],
    h_mer: [ true, [ Validators.required ]],
    h_jeu: [ true, [ Validators.required ]],
    h_ven: [ true, [ Validators.required ]],
    h_sam: [ false, [ Validators.required ]],
    h_dim: [ false, [ Validators.required ]],
    hSup_lun: [ false, [ Validators.required ]],
    hSup_mar: [ false, [ Validators.required ]],
    hSup_mer: [ false, [ Validators.required ]],
    hSup_jeu: [ false, [ Validators.required ]],
    hSup_ven: [ false, [ Validators.required ]],
    hSup_sam: [ false, [ Validators.required ]],
    hSup_dim: [ false, [ Validators.required ]],
    debut: [ false, [ Validators.required ]],
    fin: [ false, [ Validators.required ]],
    pause: [ false, [ Validators.required ]],
    replication: [ false, [ Validators.required ]],      
  });

  rep : horaireJour = {
    active : false,
    debut : '',
    fin : '',
    pause : '',
    total : ''
  };



  constructor(public activeModal: NgbActiveModal, 
              private fb: FormBuilder,
              private dataService : DataService ) { }

  repliqueJours(){

    let replique : horaireJour = {
      active : false,
      debut : '',
      fin : '',
      pause : '',
      total : ''
  };
    //Check replication jours
    (this.monFormulaire.value.replication  == true) ? 
    (this.monFormulaire.controls['debut'].enable(),
    this.monFormulaire.controls['fin'].enable(),
    this.monFormulaire.controls['pause'].enable())
    :
    (this.monFormulaire.controls['debut'].disable(),
    this.monFormulaire.controls['debut'].setValue(''),
    this.monFormulaire.controls['fin'].disable(),
    this.monFormulaire.controls['fin'].setValue(''),
    this.monFormulaire.controls['pause'].disable(),
    this.monFormulaire.controls['pause'].setValue(''),
    replique.active = false,
    replique.debut = this.monFormulaire.controls['debut'].value,
    replique.fin = this.monFormulaire.controls['fin'].value,
    replique.pause = this.monFormulaire.controls['pause'].value,
    this.individu.replique = replique);
  }

  changeVal(){

    // if(!this.monFormulaire.value.replication){
    this.individu.lundi.active = this.monFormulaire.controls['h_lun'   ].value;
    this.individu.mardi.active = this.monFormulaire.controls['h_mar'   ].value;
    this.individu.mercredi.active = this.monFormulaire.controls['h_mer'   ].value;
    this.individu.jeudi.active = this.monFormulaire.controls['h_jeu'   ].value;
    this.individu.vendredi.active = this.monFormulaire.controls['h_ven'   ].value;
    this.individu.samedi.active = this.monFormulaire.controls['h_sam'   ].value;
    this.individu.dimanche.active = this.monFormulaire.controls['h_dim'   ].value;
    this.individu.lundiSup.active = this.monFormulaire.controls['hSup_lun'].value;
    this.individu.mardiSup.active = this.monFormulaire.controls['hSup_mar'].value;
    this.individu.mercrediSup.active = this.monFormulaire.controls['hSup_mer'].value;
    this.individu.jeudiSup.active = this.monFormulaire.controls['hSup_jeu'].value;
    this.individu.vendrediSup.active = this.monFormulaire.controls['hSup_ven'].value;
    this.individu.samediSup.active = this.monFormulaire.controls['hSup_sam'].value;
    this.individu.dimancheSup.active = this.monFormulaire.controls['hSup_dim'].value;  
    // } else{
    //   (this.monFormulaire.controls['h_lun'   ].value) ? (this.individu.lundi.active) : ('');
    //   (this.monFormulaire.controls['h_mar'  ].value) ? (this.individu.mardi.active) : ('');
    //   (this.monFormulaire.controls['h_mer'  ].value) ? (this.individu.mercredi.active) : ('');
    //   (this.monFormulaire.controls['h_jeu'  ].value) ? (this.individu.jeudi.active) : ('');
    //   (this.monFormulaire.controls['h_ven'  ].value) ? (this.individu.vendredi.active) : ('');
    //   (this.monFormulaire.controls['h_sam'  ].value) ? (this.individu.samedi.active) : ('');
    //   (this.monFormulaire.controls['h_dim'  ].value) ? (this.individu.dimanche.active) : ('');
    //   (this.monFormulaire.controls['hSup_lun'  ].value) ? (this.individu.lundiSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_mar'  ].value) ? (this.individu.mardiSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_mer'  ].value) ? (this.individu.mercrediSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_jeu'  ].value) ? (this.individu.jeudiSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_ven'  ].value) ? (this.individu.vendrediSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_sam'  ].value) ? (this.individu.samediSup.active) : ('');
    //   (this.monFormulaire.controls['hSup_dim'  ].value) ? (this.individu.dimancheSup.active) : ('');
    // };

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );

    //close modal
    let replique : horaireJour = {
        active : false,
        debut : '',
        fin : '',
        pause : '',
        total : ''
    };

    if (this.monFormulaire.controls['debut'].value != ''|| this.monFormulaire.controls['fin'].value != '' || this.monFormulaire.controls['pause'].value != ''){
      replique = {
        active : true,
        debut : this.monFormulaire.controls['debut'].value,
        fin : this.monFormulaire.controls['fin'].value,
        pause : this.monFormulaire.controls['pause'].value,
        total : ''
      };
      this.individu.replique = replique;
    }
     
    this.activeModal.close(replique);

  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service

    this.monFormulaire.controls['h_lun'   ].setValue(this.individu.lundi.active      );
    this.monFormulaire.controls['h_mar'   ].setValue(this.individu.mardi.active      );
    this.monFormulaire.controls['h_mer'   ].setValue(this.individu.mercredi.active   );
    this.monFormulaire.controls['h_jeu'   ].setValue(this.individu.jeudi.active      );
    this.monFormulaire.controls['h_ven'   ].setValue(this.individu.vendredi.active   );
    this.monFormulaire.controls['h_sam'   ].setValue(this.individu.samedi.active     );
    this.monFormulaire.controls['h_dim'   ].setValue(this.individu.dimanche.active   );
    this.monFormulaire.controls['hSup_lun'].setValue(this.individu.lundiSup.active   );
    this.monFormulaire.controls['hSup_mar'].setValue(this.individu.mardiSup.active   );
    this.monFormulaire.controls['hSup_mer'].setValue(this.individu.mercrediSup.active);
    this.monFormulaire.controls['hSup_jeu'].setValue(this.individu.jeudiSup.active   );
    this.monFormulaire.controls['hSup_ven'].setValue(this.individu.vendrediSup.active);
    this.monFormulaire.controls['hSup_sam'].setValue(this.individu.samediSup.active  );
    this.monFormulaire.controls['hSup_dim'].setValue(this.individu.dimancheSup.active);

    this.rep = this.individu.replique;
    this.monFormulaire.controls['replication'].setValue(this.rep.active);
    if(this.rep.active){
      this.monFormulaire.controls['debut'].setValue(this.rep.debut);
      this.monFormulaire.controls['fin'].setValue(this.rep.fin);
      this.monFormulaire.controls['pause'].setValue(this.rep.pause);
    }




    //Check replication jours
    (this.monFormulaire.value.replication  == true) ? 
    (this.monFormulaire.controls['debut'].enable(),
    this.monFormulaire.controls['fin'].enable(),
    this.monFormulaire.controls['pause'].enable())
    :
    (this.monFormulaire.controls['debut'].disable(),
    this.monFormulaire.controls['fin'].disable(),
    this.monFormulaire.controls['pause'].disable());
  }

}
