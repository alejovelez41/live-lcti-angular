import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { Partenaire } from '../../../shared/interfaces/controle.interface';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styles: [
  ]
})
export class PartenairesComponent implements OnInit {
  controle!: Controle;
  partenaires!: string[];
  
  data_partenaires!:Partenaire[];

  monFormulaire: FormGroup = this.fb.group({
  })

  constructor(private controleService: ControleService,
    public modalService: NgbActiveModal,
    private fb: FormBuilder) { }

  ajouterPartenaires() {
    this.controle.partenaires_controle = [];
    Object.keys(this.monFormulaire.controls).forEach((key, index) => {
      console.log(this.monFormulaire.get(key)?.value, index);


      if (this.monFormulaire.get(key)?.value == true) {
        this.controle.partenaires_controle.push(index);
        console.log(this.controle.partenaires_controle, index)
      }
      this.controleService.setControle(this.controle);
    });
  }

  changeVal(){
    
  }

  ngOnInit(): void {
    this.controle = this.controleService.getControle();
    this.partenaires = this.controleService.getPartenaires();
    this.data_partenaires = this.controleService.getDataPartenaires();

    this.partenaires.forEach((element, index) => {
      this.monFormulaire.addControl('partenaire'.concat(index.toString()) ,this.fb.control(false, Validators.required));
      if(this.controle.partenaires_controle.includes(index)){
        this.monFormulaire.controls['partenaire'.concat(index.toString())].setValue(true);
      }
    });
  }

}
