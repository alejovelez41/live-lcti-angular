import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modale-retourner',
  templateUrl: './modale-retourner.component.html',
  styles: [
  ]
})
export class ModaleRetournerComponent implements OnInit {

  constructor(public modalService: NgbModal, private router: Router) { }

  retournerControles(){
    this.router.navigate(["/dossiers/en-cours"]);
    this.modalService.dismissAll()
  }
  sortir(){
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
  }

}
