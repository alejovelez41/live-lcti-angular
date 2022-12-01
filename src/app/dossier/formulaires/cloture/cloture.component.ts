import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { DataService } from '../../services/data.service';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface DataItem{
  titre: string;
  valeur: any;
}

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styles: [
  ]
})
export class ClotureComponent implements OnInit {
  individu!: Ind;

  constructor(private dataService : DataService,) { }

 
  public openPDF(): void {
    let DATA: any = document.getElementById('dataIndividus');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }



  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
  }

}
