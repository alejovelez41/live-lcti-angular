import { Component, OnInit } from '@angular/core';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styles: [
  ]
})
export class InformationsComponent implements OnInit {
  individu!: Ind;
  
  constructor(private dataService: DataService) { }

  revenirArriere(){
    
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
  }

}
