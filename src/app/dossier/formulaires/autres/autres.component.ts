import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignatureComponent } from '../signature/signature.component';
import { Ind, totauxHoraires } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';
import { JoursComponent } from './jours/jours.component';
import { horaireJour } from '../../../shared/interfaces/individu.interface';

interface DataItem{
  titre: string;
  valeur: string;
}
@Component({
  selector: 'app-autres',
  templateUrl: './autres.component.html',
  styles: [
  ]
})
export class AutresComponent implements OnInit{
  individu!: Ind;

  iterable = ['_lun', '_mar', '_mer', '_jeu', '_ven', '_sam', '_dim', 'Sup_lun',
     'Sup_mar', 'Sup_mer', 'Sup_jeu', 'Sup_ven', 'Sup_sam', 'Sup_dim'];
  
  idIndividu !: string|number;

  routeCloture : string = './controle/individus';

  totSemaine !: string;

  total_heures: number = 0;
  total_lun: number = 0;
  total_mar: number = 0;
  total_mer: number = 0;
  total_jeu: number = 0;
  total_ven: number = 0;
  total_sam: number = 0;
  total_dim: number = 0;
  total_lunS: number = 0;
  total_marS: number = 0;
  total_merS: number = 0;
  total_jeuS: number = 0;
  total_venS: number = 0;
  total_samS: number = 0;
  total_dimS: number = 0;

  monFormulaire: FormGroup = this.fb.group({
    soustraitant: [ '', [ Validators.required ]],
    identite_do: [ '', [ Validators.required ]],
    s_partie_activite: [ '', [ Validators.required]],
    id_soustraitants: [ '', [ Validators.required]],
    //Form pour salaries et autres
    h_lun: [ true, [ Validators.required ]],
    h_mar: [ true, [ Validators.required ]],
    h_mer: [ true, [ Validators.required ]],
    h_jeu: [ true, [ Validators.required ]],
    h_ven: [ true, [ Validators.required ]],
    h_sam: [ false, [ Validators.required ]],
    h_dim: [ false, [ Validators.required ]],
    
    deb_lun: [ '', [ Validators.required ]],
    deb_mar: [ '', [ Validators.required ]],
    deb_mer: [ '', [ Validators.required ]],
    deb_jeu: [ '', [ Validators.required ]],
    deb_ven: [ '', [ Validators.required ]],
    deb_sam: [ '', [ Validators.required ]],
    deb_dim: [ '', [ Validators.required ]],

    fin_lun: [ '', [ Validators.required ]],
    fin_mar: [ '', [ Validators.required ]],
    fin_mer: [ '', [ Validators.required ]],
    fin_jeu: [ '', [ Validators.required ]],
    fin_ven: [ '', [ Validators.required ]],
    fin_sam: [ '', [ Validators.required ]],
    fin_dim: [ '', [ Validators.required ]],

    paus_lun: [ '', [ Validators.required ]],
    paus_mar: [ '', [ Validators.required ]],
    paus_mer: [ '', [ Validators.required ]],
    paus_jeu: [ '', [ Validators.required ]],
    paus_ven: [ '', [ Validators.required ]],
    paus_sam: [ '', [ Validators.required ]],
    paus_dim: [ '', [ Validators.required ]],

    tot_lun: [ '', [ Validators.required ]],
    tot_mar: [ '', [ Validators.required ]],
    tot_mer: [ '', [ Validators.required ]],
    tot_jeu: [ '', [ Validators.required ]],
    tot_ven: [ '', [ Validators.required ]],
    tot_sam: [ '', [ Validators.required ]],
    tot_dim: [ '', [ Validators.required ]],

    hSup_lun: [ false, [ Validators.required ]],
    hSup_mar: [ false, [ Validators.required ]],
    hSup_mer: [ false, [ Validators.required ]],
    hSup_jeu: [ false, [ Validators.required ]],
    hSup_ven: [ false, [ Validators.required ]],
    hSup_sam: [ false, [ Validators.required ]],
    hSup_dim: [ false, [ Validators.required ]],
    
    debSup_lun: [ '', [ Validators.required ]],
    debSup_mar: [ '', [ Validators.required ]],
    debSup_mer: [ '', [ Validators.required ]],
    debSup_jeu: [ '', [ Validators.required ]],
    debSup_ven: [ '', [ Validators.required ]],
    debSup_sam: [ '', [ Validators.required ]],
    debSup_dim: [ '', [ Validators.required ]],

    finSup_lun: [ '', [ Validators.required ]],
    finSup_mar: [ '', [ Validators.required ]],
    finSup_mer: [ '', [ Validators.required ]],
    finSup_jeu: [ '', [ Validators.required ]],
    finSup_ven: [ '', [ Validators.required ]],
    finSup_sam: [ '', [ Validators.required ]],
    finSup_dim: [ '', [ Validators.required ]],

    pausSup_lun: [ '', [ Validators.required ]],
    pausSup_mar: [ '', [ Validators.required ]],
    pausSup_mer: [ '', [ Validators.required ]],
    pausSup_jeu: [ '', [ Validators.required ]],
    pausSup_ven: [ '', [ Validators.required ]],
    pausSup_sam: [ '', [ Validators.required ]],
    pausSup_dim: [ '', [ Validators.required ]],

    totSup_lun: [ '', [ Validators.required ]],
    totSup_mar: [ '', [ Validators.required ]],
    totSup_mer: [ '', [ Validators.required ]],
    totSup_jeu: [ '', [ Validators.required ]],
    totSup_ven: [ '', [ Validators.required ]],
    totSup_sam: [ '', [ Validators.required ]],
    totSup_dim: [ '', [ Validators.required ]],
    
  })
  
  constructor(private dataService : DataService, private modalService: NgbModal, private fb: FormBuilder) { }

  ouvrirModalJours() {
    const modalRef = this.modalService.open(JoursComponent, { size: 'lg' });

    modalRef.result.then((result : horaireJour) => {
      console.log(result);
      if (result) {
        this.monFormulaire.controls['h_lun'].setValue(this.individu.lundi.active);
        this.monFormulaire.controls['h_mar'].setValue(this.individu.mardi.active);
        this.monFormulaire.controls['h_mer'].setValue(this.individu.mercredi.active);
        this.monFormulaire.controls['h_jeu'].setValue(this.individu.jeudi.active);
        this.monFormulaire.controls['h_ven'].setValue(this.individu.vendredi.active);
        this.monFormulaire.controls['h_sam'].setValue(this.individu.samedi.active);
        this.monFormulaire.controls['h_dim'].setValue(this.individu.dimanche.active);
        this.monFormulaire.controls['hSup_lun'].setValue(this.individu.lundiSup.active);
        this.monFormulaire.controls['hSup_mar'].setValue(this.individu.mardiSup.active);
        this.monFormulaire.controls['hSup_mer'].setValue(this.individu.mercrediSup.active);
        this.monFormulaire.controls['hSup_jeu'].setValue(this.individu.jeudiSup.active);
        this.monFormulaire.controls['hSup_ven'].setValue(this.individu.vendrediSup.active);
        this.monFormulaire.controls['hSup_sam'].setValue(this.individu.samediSup.active);
        this.monFormulaire.controls['hSup_dim'].setValue(this.individu.dimancheSup.active);

        //Set value of replica
        if(result.active){
          this.individu.replique = result;
        }
        this.activateVal(result);
      }else{
      }
    })

    //MaJ dans le service
  }
  
  activateVal(result : horaireJour){
    console.log('result is :', result);
     //Reset disabled values & setting hour
    if(result.active){

    }
    for (const item of this.iterable){
      console.log(`h${item}`);
      console.log('value is :', this.monFormulaire.controls[`h${item}`].value);

      if (this.monFormulaire.controls[`h${item}`].value  && result.active){
        this.monFormulaire.controls[`deb${item}`].setValue(result.debut),
        this.monFormulaire.controls[`fin${item}`].setValue(result.fin),
        this.monFormulaire.controls[`paus${item}`].setValue(result.pause)
      } else if(this.monFormulaire.controls[`h${item}`].value  && !result.active){
        ''
      }else {
        this.monFormulaire.controls[`deb${item}`].setValue(''),
        this.monFormulaire.controls[`fin${item}`].setValue(''),
        this.monFormulaire.controls[`paus${item}`].setValue('')
      }
    }

    this.changeVal();
  }

  changeVal(){
    //Reinitializer le total heures
    this.total_heures = 0;

    //calcul totals jours individuels    
    for (const item of this.iterable){
      let heures = 0;
      let minutes = 0;
      let aux = 
      parseFloat(((
        ((this.monFormulaire.controls[`fin${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60)|| 0)
      - (this.monFormulaire.controls[`deb${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60) 
      ) < 0 ? 
      (
      (this.monFormulaire.controls[`fin${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60) 
      + (24 - (this.monFormulaire.controls[`deb${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60))
      - (this.monFormulaire.controls[`paus${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60)
      ) 
      : 
      (
        (this.monFormulaire.controls[`fin${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60) 
      - (this.monFormulaire.controls[`deb${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60)
      - (this.monFormulaire.controls[`paus${item}`].value.split (':').reduce (function (seconds: number, v: string | number) {return +v + seconds * 60;}, 0) / 60)
      )).toFixed(2));
      //Adtion cumulé total heures
      this.total_heures = this.total_heures + aux ;
      heures = parseFloat((aux - (aux % 1)).toFixed(2));
      minutes = parseFloat(((aux % 1) * 60).toFixed(0));
      

      this.monFormulaire.controls[`tot${item}`].setValue(
         Array.from([heures.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}), minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})]).join(':')
         );
    }

    //MaJ des valeurs dans le service
    this.individu.lundi.debut = this.monFormulaire.controls['deb_lun'].value;
    this.individu.lundi.fin = this.monFormulaire.controls['fin_lun'].value;
    this.individu.lundi.pause = this.monFormulaire.controls['paus_lun'].value;
    this.individu.lundi.total = this.monFormulaire.controls['tot_lun'].value;

    this.individu.mardi.debut = this.monFormulaire.controls['deb_mar'].value;
    this.individu.mardi.fin = this.monFormulaire.controls['fin_mar'].value;
    this.individu.mardi.pause = this.monFormulaire.controls['paus_mar'].value;
    this.individu.mardi.total = this.monFormulaire.controls['tot_mar'].value;

    this.individu.mercredi.debut = this.monFormulaire.controls['deb_mer'].value;
    this.individu.mercredi.fin = this.monFormulaire.controls['fin_mer'].value;
    this.individu.mercredi.pause = this.monFormulaire.controls['paus_mer'].value;
    this.individu.mercredi.total = this.monFormulaire.controls['tot_mer'].value;

    this.individu.jeudi.debut = this.monFormulaire.controls['deb_jeu'].value;
    this.individu.jeudi.fin = this.monFormulaire.controls['fin_jeu'].value;
    this.individu.jeudi.pause = this.monFormulaire.controls['paus_jeu'].value;
    this.individu.jeudi.total = this.monFormulaire.controls['tot_jeu'].value;

    this.individu.vendredi.debut = this.monFormulaire.controls['deb_ven'].value;
    this.individu.vendredi.fin = this.monFormulaire.controls['fin_ven'].value;
    this.individu.vendredi.pause = this.monFormulaire.controls['paus_ven'].value;
    this.individu.vendredi.total = this.monFormulaire.controls['tot_ven'].value;

    this.individu.samedi.debut = this.monFormulaire.controls['deb_sam'].value;
    this.individu.samedi.fin = this.monFormulaire.controls['fin_sam'].value;
    this.individu.samedi.pause = this.monFormulaire.controls['paus_sam'].value;
    this.individu.samedi.total = this.monFormulaire.controls['tot_sam'].value;

    this.individu.dimanche.debut = this.monFormulaire.controls['deb_dim'].value;
    this.individu.dimanche.fin = this.monFormulaire.controls['fin_dim'].value;
    this.individu.dimanche.pause = this.monFormulaire.controls['paus_dim'].value;
    this.individu.dimanche.total = this.monFormulaire.controls['tot_dim'].value;


    this.individu.lundiSup.debut = this.monFormulaire.controls['debSup_lun'].value;
    this.individu.lundiSup.fin = this.monFormulaire.controls['finSup_lun'].value;
    this.individu.lundiSup.pause = this.monFormulaire.controls['pausSup_lun'].value;
    this.individu.lundiSup.total = this.monFormulaire.controls['totSup_lun'].value;

    this.individu.mardiSup.debut = this.monFormulaire.controls['debSup_mar'].value;
    this.individu.mardiSup.fin = this.monFormulaire.controls['finSup_mar'].value;
    this.individu.mardiSup.pause = this.monFormulaire.controls['pausSup_mar'].value;
    this.individu.mardiSup.total = this.monFormulaire.controls['totSup_mar'].value;

    this.individu.mercrediSup.debut = this.monFormulaire.controls['debSup_mer'].value;
    this.individu.mercrediSup.fin = this.monFormulaire.controls['finSup_mer'].value;
    this.individu.mercrediSup.pause = this.monFormulaire.controls['pausSup_mer'].value;
    this.individu.mercrediSup.total = this.monFormulaire.controls['totSup_mer'].value;

    this.individu.jeudiSup.debut = this.monFormulaire.controls['debSup_jeu'].value;
    this.individu.jeudiSup.fin = this.monFormulaire.controls['finSup_jeu'].value;
    this.individu.jeudiSup.pause = this.monFormulaire.controls['pausSup_jeu'].value;
    this.individu.jeudiSup.total = this.monFormulaire.controls['totSup_jeu'].value;

    this.individu.vendrediSup.debut = this.monFormulaire.controls['debSup_ven'].value;
    this.individu.vendrediSup.fin = this.monFormulaire.controls['finSup_ven'].value;
    this.individu.vendrediSup.pause = this.monFormulaire.controls['pausSup_ven'].value;
    this.individu.vendrediSup.total = this.monFormulaire.controls['totSup_ven'].value;

    this.individu.samediSup.debut = this.monFormulaire.controls['debSup_sam'].value;
    this.individu.samediSup.fin = this.monFormulaire.controls['finSup_sam'].value;
    this.individu.samediSup.pause = this.monFormulaire.controls['pausSup_sam'].value;
    this.individu.samediSup.total = this.monFormulaire.controls['totSup_sam'].value;

    this.individu.dimancheSup.debut = this.monFormulaire.controls['debSup_dim'].value;
    this.individu.dimancheSup.fin = this.monFormulaire.controls['finSup_dim'].value;
    this.individu.dimancheSup.pause = this.monFormulaire.controls['pausSup_dim'].value;
    this.individu.dimancheSup.total = this.monFormulaire.controls['totSup_dim'].value;

    this.individu.soustraitant = this.monFormulaire.controls['soustraitant'].value;
    this.individu.identite_do = this.monFormulaire.controls['identite_do'].value;
    this.individu.s_partie_activite = this.monFormulaire.controls['s_partie_activite'].value;
    this.individu.id_soustraitants = this.monFormulaire.controls['id_soustraitants'].value;

    //Format Total semaines

    // this.totalSem()
    let heures = parseFloat((this.total_heures - (this.total_heures % 1)).toFixed(2));
    let minutes = parseFloat(((this.total_heures % 1) * 60).toFixed(0));
    this.totSemaine = Array.from([heures.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}), minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})]).join(':');

    this.individu.totalSem = this.totSemaine;
    //MaJ dans le service
    this.dataService.setIndividu( this.individu );
  }

  ouvrirModal() {
    const modalRef = this.modalService.open(SignatureComponent, { size: 'lg' });

    //MaJ dans le service
    this.dataService.setIndividu( this.individu );
  }
  
  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service
    this.monFormulaire.controls['soustraitant'].setValue(this.individu.soustraitant);
    this.monFormulaire.controls['identite_do'].setValue(this.individu.identite_do);
    this.monFormulaire.controls['s_partie_activite'].setValue(this.individu.s_partie_activite);
    this.monFormulaire.controls['id_soustraitants'].setValue(this.individu.id_soustraitants);


    this.monFormulaire.controls['h_lun'].setValue(this.individu.lundi.active);
    this.monFormulaire.controls['h_mar'].setValue(this.individu.mardi.active);
    this.monFormulaire.controls['h_mer'].setValue(this.individu.mercredi.active);
    this.monFormulaire.controls['h_jeu'].setValue(this.individu.jeudi.active);
    this.monFormulaire.controls['h_ven'].setValue(this.individu.vendredi.active);
    this.monFormulaire.controls['h_sam'].setValue(this.individu.samedi.active);
    this.monFormulaire.controls['h_dim'].setValue(this.individu.dimanche.active);
    
    this.monFormulaire.controls['deb_lun'].setValue(this.individu.lundi.debut);
    this.monFormulaire.controls['deb_mar'].setValue(this.individu.mardi.debut);
    this.monFormulaire.controls['deb_mer'].setValue(this.individu.mercredi.debut);
    this.monFormulaire.controls['deb_jeu'].setValue(this.individu.jeudi.debut);
    this.monFormulaire.controls['deb_ven'].setValue(this.individu.vendredi.debut);
    this.monFormulaire.controls['deb_sam'].setValue(this.individu.samedi.debut);
    this.monFormulaire.controls['deb_dim'].setValue(this.individu.dimanche.debut);

    this.monFormulaire.controls['fin_lun'].setValue(this.individu.lundi.fin);
    this.monFormulaire.controls['fin_mar'].setValue(this.individu.mardi.fin);
    this.monFormulaire.controls['fin_mer'].setValue(this.individu.mercredi.fin);
    this.monFormulaire.controls['fin_jeu'].setValue(this.individu.jeudi.fin);
    this.monFormulaire.controls['fin_ven'].setValue(this.individu.vendredi.fin);
    this.monFormulaire.controls['fin_sam'].setValue(this.individu.samedi.fin);
    this.monFormulaire.controls['fin_dim'].setValue(this.individu.dimanche.fin);

    this.monFormulaire.controls['paus_lun'].setValue(this.individu.lundi.pause);
    this.monFormulaire.controls['paus_mar'].setValue(this.individu.mardi.pause);
    this.monFormulaire.controls['paus_mer'].setValue(this.individu.mercredi.pause);
    this.monFormulaire.controls['paus_jeu'].setValue(this.individu.jeudi.pause);
    this.monFormulaire.controls['paus_ven'].setValue(this.individu.vendredi.pause);
    this.monFormulaire.controls['paus_sam'].setValue(this.individu.samedi.pause);
    this.monFormulaire.controls['paus_dim'].setValue(this.individu.dimanche.pause);

    this.monFormulaire.controls['tot_lun'].setValue(this.individu.lundi.total);
    this.monFormulaire.controls['tot_mar'].setValue(this.individu.mardi.total);
    this.monFormulaire.controls['tot_mer'].setValue(this.individu.mercredi.total);
    this.monFormulaire.controls['tot_jeu'].setValue(this.individu.jeudi.total);
    this.monFormulaire.controls['tot_ven'].setValue(this.individu.vendredi.total);
    this.monFormulaire.controls['tot_sam'].setValue(this.individu.samedi.total);
    this.monFormulaire.controls['tot_dim'].setValue(this.individu.dimanche.total);

    this.monFormulaire.controls['hSup_lun'].setValue(this.individu.lundiSup.active);
    this.monFormulaire.controls['hSup_mar'].setValue(this.individu.mardiSup.active);
    this.monFormulaire.controls['hSup_mer'].setValue(this.individu.mercrediSup.active);
    this.monFormulaire.controls['hSup_jeu'].setValue(this.individu.jeudiSup.active);
    this.monFormulaire.controls['hSup_ven'].setValue(this.individu.vendrediSup.active);
    this.monFormulaire.controls['hSup_sam'].setValue(this.individu.samediSup.active);
    this.monFormulaire.controls['hSup_dim'].setValue(this.individu.dimancheSup.active);
    
    this.monFormulaire.controls['debSup_lun'].setValue(this.individu.lundiSup.debut);
    this.monFormulaire.controls['debSup_mar'].setValue(this.individu.mardiSup.debut);
    this.monFormulaire.controls['debSup_mer'].setValue(this.individu.mercrediSup.debut);
    this.monFormulaire.controls['debSup_jeu'].setValue(this.individu.jeudiSup.debut);
    this.monFormulaire.controls['debSup_ven'].setValue(this.individu.vendrediSup.debut);
    this.monFormulaire.controls['debSup_sam'].setValue(this.individu.samediSup.debut);
    this.monFormulaire.controls['debSup_dim'].setValue(this.individu.dimancheSup.debut);

    this.monFormulaire.controls['finSup_lun'].setValue(this.individu.lundiSup.fin);
    this.monFormulaire.controls['finSup_mar'].setValue(this.individu.mardiSup.fin);
    this.monFormulaire.controls['finSup_mer'].setValue(this.individu.mercrediSup.fin);
    this.monFormulaire.controls['finSup_jeu'].setValue(this.individu.jeudiSup.fin);
    this.monFormulaire.controls['finSup_ven'].setValue(this.individu.vendrediSup.fin);
    this.monFormulaire.controls['finSup_sam'].setValue(this.individu.samediSup.fin);
    this.monFormulaire.controls['finSup_dim'].setValue(this.individu.dimancheSup.fin);

    this.monFormulaire.controls['pausSup_lun'].setValue(this.individu.lundiSup.pause);
    this.monFormulaire.controls['pausSup_mar'].setValue(this.individu.mardiSup.pause);
    this.monFormulaire.controls['pausSup_mer'].setValue(this.individu.mercrediSup.pause);
    this.monFormulaire.controls['pausSup_jeu'].setValue(this.individu.jeudiSup.pause);
    this.monFormulaire.controls['pausSup_ven'].setValue(this.individu.vendrediSup.pause);
    this.monFormulaire.controls['pausSup_sam'].setValue(this.individu.samediSup.pause);
    this.monFormulaire.controls['pausSup_dim'].setValue(this.individu.dimancheSup.pause);

    this.monFormulaire.controls['totSup_lun'].setValue(this.individu.lundiSup.total);
    this.monFormulaire.controls['totSup_mar'].setValue(this.individu.mardiSup.total);
    this.monFormulaire.controls['totSup_mer'].setValue(this.individu.mercrediSup.total);
    this.monFormulaire.controls['totSup_jeu'].setValue(this.individu.jeudiSup.total);
    this.monFormulaire.controls['totSup_ven'].setValue(this.individu.vendrediSup.total);
    this.monFormulaire.controls['totSup_sam'].setValue(this.individu.samediSup.total);
    this.monFormulaire.controls['totSup_dim'].setValue(this.individu.dimancheSup.total);

    this.totSemaine =  this.individu.totalSem;

    //Désactiver champs de saisie
    console.log('NGON INIT ACIVAFO§§§§§§§§§§§§§§§§§§§§§')

  }
}
