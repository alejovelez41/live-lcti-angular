import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { ConsentementComponent } from './consentement/consentement.component';
import { SharedStatutService } from '../../shared-statut.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Ind } from 'src/app/shared/interfaces/individu.interface';

interface DataItem{
  titre: string;
  valeur: any;
}

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styles: [
  ]
})
export class DescriptionComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';

  date: any;
  time: any;
  
  idIndividu !: string|number;
  individu!: Ind;
  consentementIndividu : boolean = true;
  signatureEnvoye : boolean = false;
  blockNavigation : boolean = true;

  dataIndividu: DataItem[] = []; 

  monFormulaire: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    refus: ['', [Validators.required]],


  })

  constructor(public statutIndividu: SharedStatutService, 
              private modalService: NgbModal, 
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dataService : DataService) { }

  alerteRefus() { 
    this._success.next(`${new Date()} - Message successfully changed.`); 
  }

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  
  ouvrirModal() {
    const modalRef = this.modalService.open(ConsentementComponent, { size: 'xl' });
    this.changeVal();
    this.blockNavigation=false;
    this.statutIndividu.newblocknav = this.blockNavigation;
  }

  changeVal(){
    this.individu.description = this.monFormulaire.controls['description'].value;
    this.individu.refus = this.monFormulaire.controls['refus'].value;
    if(this.individu.refus){this.individu.consentement = false;}
    this.dataService.setIndividu(this.individu);
  }

  refusConsentement(){
    this.statutIndividu.consentementInd=!this.monFormulaire.controls['refus'].value;
    this.consentementIndividu = !this.monFormulaire.controls['refus'].value;
    this.dataIndividu[0].valeur = this.monFormulaire.controls['description'].value;
    this.dataIndividu[1].valeur = this.monFormulaire.controls['refus'].value;
    this.dataIndividu[5].valeur = this.consentementIndividu;
    this.statutIndividu.newData = this.dataIndividu;
    this.blockNavigation=false;
    this.statutIndividu.newblocknav = this.blockNavigation;
    if (this.signatureEnvoye == true) {
      this.monFormulaire.controls['refus'].disable();
    }
    
  }

  obtenirDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        (date.getDate()).toString().padStart(2, '0'),
      ].join('-')
    );
  }

  obtenirHeure(date: Date) {
    return (
      [
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0')
      ].join(':')
    );
  }

  ngOnInit() {
    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service

    this.monFormulaire.controls['description'].setValue(this.individu.description);
    this.monFormulaire.controls['refus'].setValue(this.individu.refus);

    if(this.individu.date == '' && this.individu.heure == ''){
      //capturer la date et heure
      this.date = this.obtenirDate(new Date());
      this.individu.date = this.date;
      this.time = this.obtenirHeure(new Date());
      this.individu.heure = this.time;
      this.dataService.setIndividu(this.individu);
    }
    

    //Désactiver champs de saisie
    if (this.individu.consentement || this.individu.refus) {
      this.monFormulaire.controls['refus'].disable();
    }

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    // this.idIndividu = this.statutIndividu.idindividu;
    // this.dataIndividu = this.statutIndividu.dataind;
    // this.signatureEnvoye = this.statutIndividu.signatureind;
    // this.blockNavigation = this.statutIndividu.blocknav;
    // this.consentementIndividu = this.statutIndividu.consentementind;
    // this.monFormulaire.controls['description'].setValue(this.dataIndividu[0].valeur);
    // this.monFormulaire.controls['refus'].setValue(!this.statutIndividu.consentementInd);
    // if (this.signatureEnvoye == true) {
    //   this.monFormulaire.controls['refus'].disable();
    // }

    this.activatedRoute.params
      .subscribe( ({id}) => console.log(id))
    console.log(this.activatedRoute.params)

  }
}
