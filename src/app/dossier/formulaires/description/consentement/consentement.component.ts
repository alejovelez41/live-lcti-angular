import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { SharedStatutService } from '../../../shared-statut.service';
import { Router } from '@angular/router';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from 'src/app/dossier/services/data.service';
import { debounceTime, Subject } from 'rxjs';

interface DataItem {
  titre: string;
  valeur: any;
}

@Component({
  selector: 'app-consentement',
  templateUrl: './consentement.component.html',
  styles: [
  ]
})

export class ConsentementComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';

  individu!: Ind;

  date: any;
  time: any;

  idIndividu !: string | number;
  signature: boolean = false;
  dataIndividu: DataItem[] = [];

  routeDebut: string = './formulaires/statut'
  consentementIndividu: boolean = true

  title = 'signatureJS';
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  monFormulaire: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    signature: ['', [Validators.required]],
    dt_naissance: ['', [Validators.required]],
    typePI: ['', [Validators.required]],
    numeroPI: ['', [Validators.required]],
    consentement: ['', [Validators.required]],

  })
  closeResult = '';

  constructor(public statutIndividu: SharedStatutService, public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private dataService: DataService) { }

  alerteSignature() { 
    this._success.next(`${new Date()} - Message successfully changed.`); 
  }
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;

  // modale methodes 
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  startDrawing(event: Event) {
    console.log('Drawing started');
    console.log(event);
    // works in device not in browser

  }
  moved(event: Event) {
    console.log('Drawing started');
    console.log(event);
  }
  clearPad() {
    this.signaturePad.clear();
  }

  changeVal() {
    this.individu.nom = this.monFormulaire.controls['nom'].value;
    this.individu.prenom = this.monFormulaire.controls['prenom'].value;

    const base64Data = this.signaturePad.toDataURL();
    this.monFormulaire.controls['signature'].setValue(base64Data);
    this.individu.signature = this.monFormulaire.controls['signature'].value;

    this.individu.typePI = this.monFormulaire.controls['typePI'].value;
    this.individu.numeroPI = this.monFormulaire.controls['numeroPI'].value;
    this.individu.dt_naissance = this.monFormulaire.controls['dt_naissance'].value;

    this.dataService.setIndividu(this.individu);
  }

  savePad() {
    if (this.signaturePad.isEmpty()) {
      alert("Merci de faire signer l'individu recensé");
    } else {
      // capturer la signature de l'individu
      this.changeVal();
      // capturer le consentement de l'individu sur le formulaire
      this.individu.consentement = true;
      this.individu.refus = false;
      this.monFormulaire.controls['consentement'].setValue(this.individu.consentement);
      
      // MaJ de la valeur sur le service
      this.dataService.setIndividu(this.individu);
      // MaJ de la navigation -> deblocage statut
      this.dataService.setnav([false, false, true, true, true]);
      //close
      this.activeModal.dismiss('Cross click');

      //navigate
      this.router.navigate(['./formulaires/statut', this.individu.id]);
    }
  }

  verifSignature() {
    console.log('signature started')
  }

  isValid(campo: string) {

    return this.monFormulaire.controls[campo].errors
      && this.monFormulaire.controls[campo].touched;
  }

  

  ngOnInit(): void {

    this.individu = this.dataService.getIndividu();

    //MaJ le formulaire à partir des valeurs du service

    this.monFormulaire.controls['nom'].setValue(this.individu.nom);
    this.monFormulaire.controls['prenom'].setValue(this.individu.prenom);
    this.monFormulaire.controls['consentement'].setValue(this.individu.consentement);
    this.monFormulaire.controls['typePI'].setValue(this.individu.typePI);
    this.monFormulaire.controls['numeroPI'].setValue(this.individu.numeroPI);
    this.monFormulaire.controls['dt_naissance'].setValue(this.individu.dt_naissance);

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

  }

}
