import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStatutService } from 'src/app/dossier/shared-statut.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from '../../../shared/interfaces/individus.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';

interface MenuItem{
  texte: string;
  route: string;
}
interface DataItem{
  titre: string;
  valeur: any;
}
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }
    `
  ]
})


export class SidemenuComponent implements OnInit {
  idIndividu !: string|number;
  individu!: Ind;
  individus: Individu[] = [];
  controle!: Controle;

  consentementIndividu: boolean = false;
  refusIndividu: boolean = false;
  blockNavigation: boolean = true;
  dataIndividu: DataItem[] = []; 
  formulaireMenu: MenuItem[] = [
    {
      texte: 'Description des tâches',
      route: './description'
    },
    {
      texte: 'Statut',
      route: './statut'
    },
    {
      texte: 'Identité',
      route: './identite'
    },
    {
      texte: 'Rémunération et salariat',
      route: './remuneration'
    },
    {
      texte: 'Autres informations',
      route: './autres'
    },
  ]
  constructor(public statutIndividu: SharedStatutService,
              private controleService: ControleService, 
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router :  Router){}

  get individuFormulaire(): Ind {
    return this.dataService.getIndividu();
  }

  get navigation():boolean{
    return this.statutIndividu.blocknav;
  }

  enregistrerIndividu(){
    this.dataService.editerIndividu(this.individu).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/controle/individus', this.controle.id]);
    });
  }

  ngOnInit(){
    this.individu = this.dataService.getIndividu();
    this.controle = this.controleService.getControle();
    this.idIndividu = this.statutIndividu.idindividu;
    this.consentementIndividu = this.statutIndividu.consentementInd;
    this.refusIndividu = this.statutIndividu.refusInd;
    this.blockNavigation = this.statutIndividu.blocknav;

    this.activatedRoute.params
      .subscribe( ({id}) => console.log(id))
    console.log(this.activatedRoute.params)
  }
  

}
