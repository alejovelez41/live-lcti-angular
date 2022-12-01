import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supression-societe',
  templateUrl: './supression-societe.component.html',
  styles: [
  ]
})
export class SupressionSocieteComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
// [routerLink]="['/entreprise/extraction', entreprise.id]"