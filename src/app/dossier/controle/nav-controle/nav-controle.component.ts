import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStatutService } from '../../shared-statut.service';
import { ControleService } from '../../services/controle.service';
import { Controle, Inspecteur, Partenaire } from '../../../shared/interfaces/controle.interface';


interface MenuItem {
  texte: string;
  route: string;
}

@Component({
  selector: 'app-nav-controle',
  templateUrl: './nav-controle.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }      
    `

  ]
})
export class NavControleComponent implements OnInit {
  idControle!: any;

  controle!: Controle;
  data_inspecteurs!:Inspecteur[];
  data_partenaires!:Partenaire[];

  consentementIndividu: boolean = false;
  refusIndividu: boolean = false;
  blockNavigation: boolean = true;
  formulaireMenu: MenuItem[] = [
    {
      texte: 'Individus',
      route: './individus'
    },
    {
      texte: 'Entreprises',
      route: './societes'
    }
  ]

  constructor(public statutIndividu: SharedStatutService,
    private activatedRoute: ActivatedRoute,
    private controleService: ControleService,
    private router :  Router) { }

  get navigation(): boolean {
    return this.statutIndividu.blocknav;
  }

  enregistrerDossier(cont : Controle){
    console.log('edition de controle Nav');
    this.controle = this.controleService.getControle();
    this.controleService.editerControle(cont).subscribe(resp => {
      console.log(resp)
    });
    // this.router.navigate(['/dossiers/en-cours']);

  }

  ngOnInit(): void {
    this.controle = this.controleService.getControle();
    this.data_inspecteurs = this.controleService.getDataInspecteurs();
    this.data_partenaires = this.controleService.getDataPartenaires();
    
    console.log(this.controle)
    // console.log(this.activatedRoute.params)
    this.activatedRoute.params
      .subscribe(({ resp }) => {
        console.log(resp)});
                  

    // this.controleService.getControleById('cq4zDaf').subscribe(resp => {
    //     this.controle = resp;
    //     console.log('reponse', resp);
    //   })
    
  }

}
