import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';
import { Inspecteur } from '../../../shared/interfaces/controle.interface';

@Component({
  selector: 'app-inspecteurs',
  templateUrl: './inspecteurs.component.html',
  styles: [
  ]
})
export class InspecteursComponent implements OnInit {

  controle!: Controle;
  regions!: string[];
  data_inspecteurs!:Inspecteur[];

  monFormulaire: FormGroup = this.fb.group({
    region: ['', [Validators.required]]
  })

  constructor(private controleService: ControleService,
              public modalService: NgbActiveModal,
              private fb: FormBuilder) { 

  }

  get inspecteursGroup(){
    return this.monFormulaire.get('inspecteurs') as FormGroup;
  }

  get inspecteursArr(){
    return this.monFormulaire.get('inspecteurs') as FormArray;
  }

  // get region(){
  //   return this.monFormulaire.get('region');
  // }
  
  ajouterInspecteurs(){
    this.controle.inspecteurs_controle = [];
    Object.keys(this.monFormulaire.controls).forEach((key, index) => {
      console.log(this.monFormulaire.get(key)?.value, index);
      

      if (this.monFormulaire.get(key)?.value == true) {
        this.controle.inspecteurs_controle.push(index-1);
        console.log(this.controle.inspecteurs_controle, index)
      } 
      this.controleService.setControle(this.controle);
  });
    // this.monFormulaire.value.forEach((element: any) => {
    //   // if (element){

    //   // }
    //   console.log(element);
      
    // });
    // Object.keys(this.monFormulaire.controls).forEach(key => {
    //   console.log(this.monFormulaire.get(key)?.value);

      // if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
      //     this.markControlsDirty(abstractControl);
      // } else {
      //     abstractControl.markAsDirty();
      // }
  // });

  }
  
  // changeVal(){
  //   // this.inspecteursArr.push(this.fb.control(true, Validators.required));
  //   // this.inspecteursGroup.addControl('zeze',this.fb.control(true, Validators.required));
  //   console.log(this.region);
  //   console.log(this.monFormulaire.value.region)
    
  // }

  // changerRegion(e: any){
  //   this.region?.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  //   console.log('hola');
  //   this.changeVal();
  // }

  ngOnInit(): void {
    this.controle = this.controleService.getControle();
    this.regions = this.controleService.getRegions();
    this.data_inspecteurs = this.controleService.getDataInspecteurs();
    let insps = this.data_inspecteurs;

    this.data_inspecteurs.forEach((element, index) => {
      this.monFormulaire.addControl('inspecteur'.concat(index.toString()) ,this.fb.control(false, Validators.required));
      if(this.controle.inspecteurs_controle.includes(index)){
        this.monFormulaire.controls['inspecteur'.concat(index.toString())].setValue(true);
      }
      // this.inspecteursGroup.addControl('inspecteur'.concat(index.toString()) ,this.fb.control(false, Validators.required));
    });
    this.monFormulaire.controls['region'].setValue(this.regions[5]);

  }

}
