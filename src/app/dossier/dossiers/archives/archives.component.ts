import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { ConsulterIndividusComponent } from '../consulter-individus/consulter-individus.component';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styles: [
  ]
})
export class ArchivesComponent implements OnInit {
  controles!: Controle[];
  entreprises: Entreprise[] = [];
  individus: Ind[] = [];

  constructor(private controleService: ControleService,
              private entrepriseService: EntrepriseService,
              private modalService: NgbModal,
              private dataService: DataService) { }

  ouvrirModal(ent: Entreprise) {
    let entPreview: Entreprise = ent;
    this.controleService.setEntreprisePreview(entPreview);

    const modalRef = this.modalService.open(ConsulterIndividusComponent, { size: 'lg' });
    console.log('resultado modal ref', modalRef.result);
    modalRef.result.then((data) => {
      console.log('data : ', data);
      if (data && data === 'Cross click') {
        console.log('Obtained Data :', data);
        return
      } else if (data) {
        return
      } else {
        return
      };
    });
  }

  setEntreprise(entreprise : Entreprise){
    this.entrepriseService.setEntreprise(entreprise);
  }
  setControle(controle : Controle){
    this.controleService.setControle(controle);
  }

  obtenirControles() {
    console.log('obtenirControles() called')
    this.controleService.getControles()
      .subscribe(controlesService => {
        this.controles = [];
        controlesService.forEach(cont => {
          if (cont.etat == "archive") {
            this.controles.push(cont);
          };
        })
      });
      
      this.controleService.setControles(this.controles);
      console.log(this.controles)
  }



  obtenirEntreprises() {
    console.log('ObtentionEntreprises Called');
    this.entrepriseService.getEntreprises()
      .subscribe(entreprisesService => {
        this.entrepriseService.setSocietes(entreprisesService);
        this.entreprises = entreprisesService;
        this.controleService.setEntreprises(this.entreprises)
      })
  }

  obtenirIndividus() {
    console.log('ObtentionIndividus Called');
    this.dataService.getIndividus()
      .subscribe(individusService => {
        this.individus = individusService;
        this.controleService.setIndividus(this.individus)
      });
  }

  ngOnInit(): void {
    
    this.obtenirControles();
    this.obtenirEntreprises();
    this.obtenirIndividus();

  }

}
