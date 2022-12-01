import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaleRetournerComponent } from '../modale-retourner/modale-retourner.component';

@Component({
  selector: 'app-nav-parametres',
  templateUrl: './nav-parametres.component.html',
  styles: [
  ]
})
export class NavParametresComponent implements OnInit {

  constructor(public modalService: NgbModal,
              private router: Router) { }

  ouvrirModalRetourner() { 
    const modalRef = this.modalService.open(ModaleRetournerComponent, { size: 'lg' });    
  }


  ngOnInit(): void {
  }

}
