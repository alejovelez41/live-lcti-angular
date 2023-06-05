import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ControleService } from 'src/app/dossier/services/controle.service';
import { DataService } from 'src/app/dossier/services/data.service';
import { EntrepriseService } from 'src/app/dossier/services/entreprise.service';
import { OutilsService } from 'src/app/dossier/services/outils.service';
import { Controle } from '../interfaces/controle.interface';
import { Entreprise } from '../interfaces/entreprises.interface';
import { Ind } from '../interfaces/individu.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boite-outils',
  templateUrl: './boite-outils.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }    
    `
  ]
})
export class BoiteOutilsComponent implements OnInit {

  closeResult!: string;
  individu!: Ind;
  entreprise!: Entreprise;
  entreprises: Entreprise[] = [];
  controle!: Controle;

  idCont !: string | number;
  idEnt !: string | number;
  idInd !: string | number;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private outilsService : OutilsService,
    private entrepriseService: EntrepriseService, 
    private dataService: DataService,
    private controleService: ControleService,
    private router : Router
  ) { }

  openEnd(content: TemplateRef<any>) {
    
    this.individu = this.dataService.getIndividu();
    if(this.individu){
      this.dataService.editerIndividu(this.individu).subscribe(resp => {
        console.log(resp);
      });
    }    

    console.log('boite à outils',this.individu);
    console.log('url router', this.router.url)

    this.entreprises =  this.entrepriseService.getSocietes();

    this.controle = this.controleService.getControle();
    if(this.individu){
      if(this.individu.idEnt){
        this.entreprise =  this.entrepriseService.sociteById(this.individu.idEnt);
      }      
    } else{this.entreprise =  this.entrepriseService.getDataEntreprise()}
    
    if (this.controle) {this.idCont = this.controle.id} else { this.idCont = ''}
    if (this.individu) {this.idEnt = this.individu.idEnt} else if (this.entreprise) {this.idEnt = this.entreprise.id} else { this.idEnt = ''}
    if (this.individu) {this.idInd = this.individu.id} else { this.idInd = ''}
    this.offcanvasService.open(content, { position: 'end' });

    //service Outils
    this.outilsService.setRoute(this.router.url);
    console.log('setting route', this.router.url);
    const adress = this.router.url.split('/');
    adress.shift();
    console.log(adress);

    if(adress[0] == 'controle' || adress[0] == 'parametres' ){
      this.outilsService.setControle(this.controleService.getControle());
      console.log('objectif setted', this.controleService.getControle());
      this.outilsService.setType('evenement');
      console.log('type setted', this.outilsService.getType());
    }else if(adress[0] == 'entreprise' && adress[1] == 'societe' ){
      this.outilsService.setEntreprise(this.entrepriseService.getDataEntreprise());
      console.log('objectif setted', this.entrepriseService.getDataEntreprise());
      this.outilsService.setType('entreprise');
      console.log('type setted', this.outilsService.getType());
    }else if(adress[0] == 'formulaires' || adress[0] == 'entreprise' && adress[1] == 'recapIndividu' ){
      this.outilsService.setIndividu(this.dataService.getIndividu());
      console.log('objectif setted', this.dataService.getIndividu());
      this.outilsService.setType('individu');
      console.log('type setted', this.outilsService.getType());
    }else{
      this.outilsService.resetObjectif();
      this.outilsService.setType('Toutes mes notes');
    }
    // this.outilsService.setObjectif()
    // types : string[] = ['Toutes mes notes', 'evenement', 'entreprise', 'individu'];
    
  }

  openTop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' });
  }

  openBottom(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'bottom' });
  }

  openNoBackdrop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdrop: false });
  }

  openScroll(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }

  openNoKeyboard(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { keyboard: false });
  }

  openNoAnimation(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { animation: false });
  }

  openCustomBackdropClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdropClass: 'bg-info' });
  }

  openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { panelClass: 'bg-info' });
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    console.log('boite à outils',this.individu);
    this.entreprises =  this.entrepriseService.getSocietes();
    if(this.individu){
      this.entreprise =  this.entrepriseService.sociteById(this.individu.idEnt);
    } else{this.entreprise =  this.entrepriseService.getDataEntreprise()}
    
    this.controle = this.controleService.getControle();
    
  }  

}
