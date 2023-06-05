import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { SharedStatutService } from '../../shared-statut.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClotureComponent } from 'src/app/dossier/formulaires/cloture/cloture.component';
import { DataService } from '../../services/data.service';
import { Individu } from '../../../shared/interfaces/individus.interface';

import { HttpClient } from '@angular/common/http';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { Ind } from 'src/app/shared/interfaces/individu.interface';


interface DataItem{
  titre: string;
  valeur: any;
}

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styles: [
  ]
})
export class SignatureComponent implements OnInit {
  individu!: Ind;
  controle!: Controle;
  idIndividu !: string|number;
  dataIndividu: DataItem[] = []; 

  routeIndividus : string = './controle/individus'
  clotureIndividu : boolean = true;

  title = 'signatureJS';
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  monFormulaire: FormGroup = this.fb.group({
    signature_cloture: ['', [Validators.required]],
    refus: ['', [Validators.required]],
    cloture: ['', [Validators.required]],

  })

  closeResult = '';

  constructor(public statutIndividu: SharedStatutService, 
              public modalService: NgbActiveModal, 
              private fb: FormBuilder,
              private dataService : DataService,
              private controleService: ControleService) {} 

  

  // modale methodes 
  clotureControle() {
    // const modalRef = this.modalService.open(ClotureComponent, { size: 'xl' });
    // this.dataIndividu[0].valeur = this.monFormulaire.controls['description'].value;
    // this.dataIndividu[1].valeur = this.monFormulaire.controls['refus'].value;

  }
  

  changeVal() {
    console.log('algo pasa')
    const base64Data = this.signaturePad.toDataURL();
    this.monFormulaire.controls['signature_cloture'].setValue(base64Data);

    if(this.monFormulaire.controls['refus'].value && this.monFormulaire.controls['signature_cloture'].value == ''){
      this.monFormulaire.controls['refus'].setValue(false);
    }
    
    this.individu.signature_cloture = this.monFormulaire.controls['signature_cloture'].value;
    this.individu.refus_signature = this.monFormulaire.controls['refus'].value;

    //enregistrer signature clôture?
    // const base64Data = this.signaturePad.toDataURL();
    // this.monFormulaire.controls['signature'].setValue(base64Data);
    // this.individu.signature = this.monFormulaire.controls['signature'].value;

    this.dataService.setIndividu(this.individu);
  }


  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  startDrawing(event: Event) {
    
    console.log(event);
    this.changeVal()
    // works in device not in browser

  }
  moved(event: Event) {
    this.changeVal()
    // works in device not in browser
  }
  clearPad() {
    this.signaturePad.clear();
  }
  savePad() {
    // capturer la signature de l'individu
    this.individu.archived = true;
    this.changeVal();
    // MaJ de la valeur sur le service

    this.dataService.editerIndividu(this.individu).
      subscribe(resp => {
        console.log('Individu Edité', resp);
      });
    
    //Reset de l'individu
    this.dataService.getNewIndividu();
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.controle = this.controleService.getControle();
  }

}
