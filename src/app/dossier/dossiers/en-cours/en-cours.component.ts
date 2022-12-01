import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { Individu } from 'src/app/shared/interfaces/individus.interface';
import { Controle } from '../../../shared/interfaces/controle.interface';
import { ApiService } from '../../services/api.service';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { ArchivageEventComponent } from '../archivage-event/archivage-event.component';
import { ConsulterIndividusComponent } from '../consulter-individus/consulter-individus.component';
import { SupressionControleComponent } from '../supression-controle/supression-controle.component';

@Component({
  selector: 'app-en-cours',
  templateUrl: './en-cours.component.html',
  styles: [
  ]
})
export class EnCoursComponent implements OnInit {

  controles!: Controle[];
  entreprises: Entreprise[] = [];
  individus: Ind[] = [];

  constructor(private apiService: ApiService,
    private controleService: ControleService,
    private entrepriseService: EntrepriseService,
    private modalService: NgbModal,
    private dataService: DataService) { }
  // private controleService : ControleService,

  obtenirControles() {
    console.log('obtenirControles() called')
    this.controleService.getControles()
      .subscribe(controlesService => {
        this.controles = [];
        controlesService.forEach(cont => {
          if (cont.etat != "archive") {
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
        this.entrepriseService.setSocietes(entreprisesService);
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



  ajouterControle() {

    this.controleService.ajouterControle(this.controleService.getNewControle()).
      subscribe(resp => {
        console.log('Creation dun nouvelle contrôle', resp);
        this.obtenirControles();
      });

  }
  modifierControle(cont: Controle) {
    console.log('controle de la liste', cont)
    this.controleService.setControle(cont);
    console.log('Routage vers le controle')
    this.controleService.getControleById(cont.id)
      .subscribe(resp => {
        console.log('reponse', resp);
        this.controleService.setControle(resp);
      });
  }

  modaleArchivage(cont: Controle) {
    this.controleService.setControle(cont);
    const modalRef = this.modalService.open(ArchivageEventComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'archiverEvent') {

        cont.etat = "archive";
        this.controleService.editerControle(cont)
          .subscribe(resp => {
            console.log('controle à archiver', resp);
            this.controleService.setControle(resp);
          });
      }
      // else if (data == 'non') {
      //   return
      // };
      this.obtenirControles();
    });
  }


  modaleSupression(id: string | number) {
    const modalRef = this.modalService.open(SupressionControleComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      console.log(data);
      if (data === 'oui') {
        this.controleService.effacerControle(id)
          .subscribe();
        console.log('deletion sucess');
      }
      // else if (data == 'non') {
      //   return
      // };
      this.obtenirControles();
    });
  }

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
        // this.entreprise = data;
        // this.entrepriseService.setEntreprise(this.entreprise);
        // console.log('result', data);
        // this.changeVal();
        // this.filtrageEntreprisesControle();




        return
      } else {
        return
      };
    });
  }

  archiverEvent() {

  }

  synchroData(controle: Controle) { }

  ngOnInit(): void {
    this.obtenirControles();
    this.obtenirEntreprises();
    this.obtenirIndividus();

  }
}
