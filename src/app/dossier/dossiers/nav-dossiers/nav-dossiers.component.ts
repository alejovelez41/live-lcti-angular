import { Component, OnInit } from '@angular/core';
import { SharedStatutService } from '../../shared-statut.service';

interface MenuItem{
  texte: string;
  route: string;
}

@Component({
  selector: 'app-nav-dossiers',
  templateUrl: './nav-dossiers.component.html',
  styles: [
    `
    li {
      cursor:pointer;
    }
  `
  ]
})
export class NavDossiersComponent implements OnInit {
  consentementIndividu: boolean = false;
  refusIndividu: boolean = false;
  blockNavigation: boolean = true;
  formulaireMenu: MenuItem[] = [
    {
      texte: 'En cours',
      route: './en-cours'
    },
    {
      texte: 'Archivés',
      route: './archives'
    }
  ]


  constructor(public statutIndividu: SharedStatutService) { }
  get navigation():boolean{
    return this.statutIndividu.blocknav;
  }

  ngOnInit(): void {
  }

}
