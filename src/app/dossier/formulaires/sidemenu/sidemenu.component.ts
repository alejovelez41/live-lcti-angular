import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedStatutService } from 'src/app/dossier/shared-statut.service';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from '../../../shared/interfaces/individus.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from '../../services/entreprise.service';

interface MenuItem {
  texte: string;
  route: string;
}
interface DataItem {
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
  private _success = new Subject<string>();
  successMessage = '';
  idIndividu !: string | number;
  individu!: Ind;
  individus: Individu[] = [];
  controle!: Controle;
  fiche !: boolean;
  menuNav: boolean[] = [];

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
    private entrepriseService: EntrepriseService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  // get individuFormulaire(): Ind {
  //   return this.dataService.getIndividu();
  // }

  // get navigation(): boolean {
  //   return this.statutIndividu.blocknav;
  // }

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  enregistrerIndividu() {
    this.dataService.editerIndividu(this.individu).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/controle/individus', this.controle.id]);
    });
  }

  get creationFiche() {
    this.fiche = this.entrepriseService.getCreationFiche();
    return this.entrepriseService.getCreationFiche()
  }

  ngOnInit() {
    
    this.dataService.nav$.subscribe(navigation => {
      console.log('navigations values update: ',navigation );
      this.menuNav = navigation;
      
    })
    this.dataService.setnav([false, true, true, true, true]);
    this.fiche = false;
    this.individu = this.dataService.getIndividu();
    this.controle = this.controleService.getControle();
    this.idIndividu = this.statutIndividu.idindividu;
    this.consentementIndividu = this.statutIndividu.consentementInd;
    this.refusIndividu = this.statutIndividu.refusInd;
    this.blockNavigation = this.statutIndividu.blocknav;

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.activatedRoute.params
      .subscribe(({ id }) => console.log(id))
    console.log(this.activatedRoute.params)
    
  }


}
