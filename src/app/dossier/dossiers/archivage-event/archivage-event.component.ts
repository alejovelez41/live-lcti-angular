import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Controle } from 'src/app/shared/interfaces/controle.interface';
import { ControleService } from '../../services/controle.service';

@Component({
  selector: 'app-archivage-event',
  templateUrl: './archivage-event.component.html',
  styles: [
  ]
})
export class ArchivageEventComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private controleService: ControleService, private router: Router) { }
  controle!: Controle;

  arhiverEvent() {
    this.activeModal.close('archiverEvent');
    this.router.navigate(['dossiers/archives']);
  }

  ngOnInit(): void {
    this.controle = this.controleService.getControle();

  }

}
