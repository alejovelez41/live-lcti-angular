import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Controle, Inspecteur, Partenaire } from 'src/app/shared/interfaces/controle.interface';
import { Entreprise } from 'src/app/shared/interfaces/entreprises.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';
import { ControleService } from '../../services/controle.service';
import { DataService } from '../../services/data.service';
import { EntrepriseService } from '../../services/entreprise.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-controle',
  templateUrl: './pdf-controle.component.html',
  styles: [
  ]
})
export class PdfControleComponent implements OnInit {
  ch !: any;
  cw !: any;
  individus: Ind[] = [];

  individu!: Ind;
  entreprise!: Entreprise;
  controle!: Controle;
  data_inspecteurs!:Inspecteur[];
  data_partenaires!:Partenaire[];

  constructor(
              private entrepriseService: EntrepriseService, 
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private controleService: ControleService
  ) { }

  filtrageIndividusEntreprise(){
    console.log('FiltrageIndividusEntreprise Called');
    this.dataService.getIndividus()
        .subscribe(individusService => {
          console.log('total inds :', individusService)
          this.individus=[];
          individusService.forEach(ind => {
            console.log(ind.id,this.entreprise, (this.entreprise.id_individus.includes(ind.id)))
            if (this.entreprise.id_individus.includes(ind.id)) {
              console.log('pushing: ', ind)
              this.individus.push(ind);
            }
          });
          console.log('individus filtrage Entreprise : ',this.individus);
        });
  }

  get dataEnt():Entreprise{
    return this.entrepriseService.getDataEntreprise();
  }

  public downloadPDF(): void {
    let DATAcont: any = document.getElementById('dataControle');
    let DATAent: any = document.getElementById('dataSociete');
    let DATAinds: any = document.getElementById('dataIndividus');
    
    let fileWidth = 208;
    let fileHeight = 295;

    let PDF = new jsPDF('p', 'mm', 'a4');

    html2canvas(DATAcont).then((contCanvas) => {
      let calculedHeightEnt = (fileHeight* contCanvas.width ) / fileWidth;

      var srcImg  = contCanvas;
      var sX      = 0;
      var sY      = 0; // start 297 pixels down for every new page
      var sWidth  = contCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX      = 0;
      var dY      = 0;
      var dWidth  = 2480 ;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width         = 2480;
      var height        = 3508;
      PDF.setPage(1);

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth*0.95), (fileHeight*0.95));
    });

    html2canvas(DATAent).then((entCanvas) => {
      let calculedHeightEnt = (fileHeight* entCanvas.width ) / fileWidth;

      var srcImg  = entCanvas;
      var sX      = 0;
      var sY      = 0; // start 297 pixels down for every new page
      var sWidth  = entCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX      = 0;
      var dY      = 0;
      var dWidth  = 2480 ;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width         = 2480;
      var height        = 3508;
      PDF.addPage('a4');

      PDF.setPage(2);

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth*0.95), (fileHeight*0.95));
    });

    html2canvas(DATAinds).then((canvas) => {
      let cHeight = (fileHeight* canvas.width ) / fileWidth;

      for (var i = 0; i <= (canvas.height/cHeight); i++) {
        let startPos = cHeight*i;

        var srcImg  = canvas;
        var sX      = 0;
        var sY      = cHeight*i;; // start 297 pixels down for every new page
        var sWidth  = canvas.width;
        var sHeight = cHeight;
        var dX      = 0;
        var dY      = 0;
        var dWidth  = 2480 ;
        var dHeight = 3508 ;

        let onePageCanvas = document.createElement("canvas");
        onePageCanvas.width = 2480;
        onePageCanvas.height = 3508;

        var ctx = onePageCanvas.getContext('2d');
        ctx!.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

        var width         = 2480;
        var height        = 3508;

        
        PDF.addPage('a4'); //8.5" x 11" in pts (in*72)
        
        PDF.setPage(i+3);
        PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth*0.95), (fileHeight*0.95));


      }
      PDF.save('angular-demo.pdf');
    });
  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.entreprise =  this.entrepriseService.getDataEntreprise();
    this.controle = this.controleService.getControle();
    this.data_inspecteurs = this.controleService.getDataInspecteurs();
    this.data_partenaires = this.controleService.getDataPartenaires();
    

    this.activatedRoute.params
      .subscribe(({ id }) => this.entreprise.id = id)
    console.log(this.activatedRoute.params)

    this.entrepriseService.getEntrepriseById(this.entreprise.id).
      subscribe(dataEntreprise => (
        this.entreprise = dataEntreprise,
        //recuperer valeurs service
        this.filtrageIndividusEntreprise()
        
    ));
    
    let DATAinds: any = document.getElementById('dataIndividus');
    this.ch = DATAinds.clientHeight;
    this.cw = DATAinds.clientWidth;
      
    html2canvas(DATAinds).then((canvas) => {
        console.log(canvas);
        console.log('canvas')
    });
  }

}
