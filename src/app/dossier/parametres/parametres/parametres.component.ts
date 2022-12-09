import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cardNote, notes } from 'src/app/shared/interfaces/individu.interface';
import { Controle, Inspecteur, Partenaire } from '../../../shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { InspecteursComponent } from '../inspecteurs/inspecteurs.component';
import { PartenairesComponent } from '../partenaires/partenaires.component';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styles: [
  ]
})
export class ParametresComponent implements OnInit {
  date: any;
  time: any;
  // newControle: boolean = true;
  data_inspecteurs!: Inspecteur[];
  data_partenaires!: Partenaire[];

  controle!: Controle;
  noteDefault: cardNote[] =[];

  newControle: Controle = {
    id: "",
    nomControle: "",
    newControle: true,
    etat: "",
    dt_controle: "",
    hr_controle: "",
    lieu_controle: "",
    inspecteurs_controle: [],
    partenaires_controle: [],
    entreprises_controle: [],
    individus_controle: [],
    notesCont : this.noteDefault
  };

  monFormulaire: FormGroup = this.fb.group({
    nomControle: ['', [Validators.required]],
    dt_controle: ['', [Validators.required]],
    hr_controle: ['', [Validators.required]],
    lieu_controle: ['', [Validators.required]],
    inspecteurs_controle: ['', [Validators.required]],
    partenaires_controle: ['', [Validators.required]],

  })

  constructor(private fb: FormBuilder,
    private controleService: ControleService,
    private router: Router,
    private modalService: NgbModal) { }

  changeVal() {
    this.controle.nomControle = this.monFormulaire.controls['nomControle'].value;
    this.controle.dt_controle = this.monFormulaire.controls['dt_controle'].value;
    this.controle.hr_controle = this.monFormulaire.controls['hr_controle'].value;
    this.controle.lieu_controle = this.monFormulaire.controls['lieu_controle'].value;

    //MaJ dans le service
    this.controleService.setControle(this.controle);
  }

  ouvrirModalInspecteurs() {
    const modalRef = this.modalService.open(InspecteursComponent, { size: 'lg' });
    this.controle = this.controleService.getControle();
  }

  ouvrirModalPartenaires() {
    const modalRef = this.modalService.open(PartenairesComponent, { size: 'lg' });
    this.controle = this.controleService.getControle();
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

  creerControle() {
    console.log('MaJ du controle');
    let auxCont :Controle = this.controle;

    auxCont.newControle = false;
    auxCont.etat = "created";

    // this.controle.newControle = false;
    // this.controle.etat = "created";
    this.controleService.editerControle(auxCont)
      .subscribe(resp => {
        console.log('reponse', resp);
        this.router.navigate(['/controle/individus', resp.id]);
        this.controle = resp;
        this.controleService.setControle(resp);

      });
  }



  ngOnInit(): void {
    // this.controle = this.controleService.getNewControle();
    this.controle = this.controleService.getControle();
    console.log('new service control', this.controleService.getNewControle(), this.controleService.getControle())
    this.data_inspecteurs = this.controleService.getDataInspecteurs();
    this.data_partenaires = this.controleService.getDataPartenaires();

    if (this.controle.newControle) {
      //auto-complete champs heure et date
      this.date = this.obtenirDate(new Date());
      this.time = this.obtenirHeure(new Date());
      this.monFormulaire.controls["dt_controle"].setValue(this.date);
      this.monFormulaire.controls["hr_controle"].setValue(this.time);
      console.log('current init control', this.controle);
      this.changeVal();
    } else {
      this.monFormulaire.controls["dt_controle"].setValue(this.controle.dt_controle);
      this.monFormulaire.controls["hr_controle"].setValue(this.controle.hr_controle);
      this.monFormulaire.controls["lieu_controle"].setValue(this.controle.lieu_controle);
      this.monFormulaire.controls["nomControle"].setValue(this.controle.nomControle);
      this.monFormulaire.controls["inspecteurs_controle"].setValue(this.controle.inspecteurs_controle);
      this.monFormulaire.controls["partenaires_controle"].setValue(this.controle.partenaires_controle);

    }
    
  }
}
