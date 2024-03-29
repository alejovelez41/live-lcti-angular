import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EntrepriseService } from '../../services/entreprise.service';
import { DataService } from '../../services/data.service';
import { Entreprise } from '../../../shared/interfaces/entreprises.interface';
import { ActivatedRoute } from '@angular/router';
import { ControleService } from '../../services/controle.service';
import { Controle, Inspecteur, Partenaire } from 'src/app/shared/interfaces/controle.interface';
import { Ind } from 'src/app/shared/interfaces/individu.interface';


@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styles: [
  ]
})
export class ExtractionComponent implements OnInit {
  dimensionsEnt: any[] = [];
  dimensionsInd: any[] = [];

  size !: any;
  ch !: any;
  cw !: any;
  individus: Ind[] = [];

  individu!: Ind;
  entreprise!: Entreprise;
  controle!: Controle;
  data_inspecteurs!: Inspecteur[];
  data_partenaires!: Partenaire[];


  constructor(private entrepriseService: EntrepriseService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private controleService: ControleService) { }


  filtrageIndividusEntreprise() {
    console.log('FiltrageIndividusEntreprise Called');
    this.dataService.getIndividus()
      .subscribe(individusService => {
        console.log('total inds :', individusService)
        this.individus = [];
        individusService.forEach(ind => {
          console.log(ind.id, this.entreprise, (this.entreprise.id_individus.includes(ind.id)))
          if (this.entreprise.id_individus.includes(ind.id)) {
            console.log('pushing: ', ind)
            this.individus.push(ind);
          }
        });
        console.log('individus filtrage Entreprise : ', this.individus);
      });

  }

  get dataEnt(): Entreprise {
    return this.entrepriseService.getDataEntreprise();
  }

  public openPDF(): void {
    let DATAcont: any = document.getElementById('dataControle');
    let DATAent: any = document.getElementById('dataSociete');
    let DATAinds: any = document.getElementById('dataIndividus');

    html2canvas(DATAinds).then((canvas) => {
      let fileWidth = 900;
      let fileHeight = 980;
      // let fileHeight = (canvas.height * fileWidth) / canvas.width;
      let calculedHeight = (fileHeight * canvas.width) / fileWidth;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'pt', 'letter');

      console.log('Client Height', (DATAinds.clientHeight));
      console.log('Client Width', (DATAinds.clientWidth));
      console.log('Canvas Height', (canvas.height));
      console.log('Canvas Width', (canvas.width));
      console.log('Calculed Y', calculedHeight);

      html2canvas(DATAent).then((entCanvas) => {
        let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;

        var srcImg = entCanvas;
        var sX = 0;
        var sY = calculedHeightEnt * i; // start 297 pixels down for every new page
        var sWidth = entCanvas.width;
        var sHeight = calculedHeightEnt;
        var dX = 0;
        var dY = 0;
        var dWidth = 900;
        var dHeight = 980;


        let onePageCanvas = document.createElement("canvas");
        onePageCanvas.width = 900;
        onePageCanvas.height = 980;

        var ctx = onePageCanvas.getContext('2d');
        ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

        var width = 900;
        var height = 980;
        PDF.setPage(1);

        PDF.addImage(canvasDataURL, 'PNG', 15, 35, (width * 0.6), (height * 0.65));
      });
      for (var i = 1; i <= (canvas.height / calculedHeight) + 1; i++) {
        //! This is all just html2canvas stuff
        var srcImg = canvas;
        var sX = 0;
        var sY = calculedHeight * i; // start 297 pixels down for every new page
        var sWidth = canvas.width;
        var sHeight = calculedHeight;
        var dX = 0;
        var dY = 0;
        var dWidth = 900;
        var dHeight = 980;

        let onePageCanvas = document.createElement("canvas");
        onePageCanvas.width = 900;
        onePageCanvas.height = 980;
        // onePageCanvas.setAttribute('width', '595');
        // onePageCanvas.setAttribute('height', '842');
        var ctx = onePageCanvas.getContext('2d');
        // details on this usage of this function: 
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
        ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        // document.body.appendChild(canvas);
        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

        var width = 900;
        console.log('page canvas width', width);
        var height = 980;
        console.log('page canvas height', height);

        //! If we're on anything other than the first page,
        // add another page
        if (i > 1) {
          PDF.addPage('letter'); //8.5" x 11" in pts (in*72)
        }
        //! now we declare that we're working on that page
        PDF.setPage(i + 1);
        //! now we add content to that page!
        PDF.addImage(canvasDataURL, 'PNG', 15, 35, (width * 0.6), (height * 0.65));

      }
      //! after the for loop is finished running, we save the pdf.

      //https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer


      let position = 0;
      // PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  public downloadPDF(): void {
    let DATAcont: any = document.getElementById('dataControle');
    let DATAent: any = document.getElementById('dataSociete');
    let DATAinds: any = document.getElementById('dataIndividus');

    let fileWidth = 208;
    let fileHeight = 295;

    let PDF = new jsPDF('p', 'mm', 'a4');

    html2canvas(DATAent).then((entCanvas) => {
      let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;
      console.log('calulated height ent: ', calculedHeightEnt);
      console.log('property height ent: ', entCanvas.height, entCanvas.width);

      var srcImg = entCanvas;
      var sX = 0;
      var sY = 0; // start 297 pixels down for every new page
      var sWidth = entCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX = 0;
      var dY = 0;
      var dWidth = 2480;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width = 2480;
      var height = 3508;
      PDF.setPage(1);

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));
    });

    html2canvas(DATAinds).then((canvas) => {
      let cHeight = (fileHeight * canvas.width) / fileWidth;

      for (var i = 0; i <= (canvas.height / cHeight); i++) {
        let startPos = cHeight * i;

        var srcImg = canvas;
        var sX = 0;
        var sY = cHeight * i;; // start 297 pixels down for every new page
        var sWidth = canvas.width;
        var sHeight = cHeight;
        var dX = 0;
        var dY = 0;
        var dWidth = 2480;
        var dHeight = 3508;

        let onePageCanvas = document.createElement("canvas");
        onePageCanvas.width = 2480;
        onePageCanvas.height = 3508;

        var ctx = onePageCanvas.getContext('2d');
        ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

        var width = 2480;
        var height = 3508;


        PDF.addPage('a4'); //8.5" x 11" in pts (in*72)

        PDF.setPage(i + 2);
        PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));


      }
      PDF.save('angular-demo.pdf');
    });
  };

  // TEST du pdf --------------------------
  // --------------------------------------
  calculsPDF() {
    let sections = ['description', 'consentement', 'statut', 'identite', 'remuneration', 'autres', 'signature', 'notes'];


    let DATAent: any = document.getElementById('dataSociete');
    let DATAinds: any = document.getElementById('dataIndividus');
    var W = 2480;
    var H = 3508;

    //Calcul entreprise
    this.dimensionsEnt = [];

    if (document.getElementById('dataSociete') != null) {
      let entH = document.getElementById('dataSociete')?.clientHeight;
      if ((entH! / H) < 1) {
        console.log('height ent 2', entH)
        console.log('dim ent', this.dimensionsEnt)
        this.dimensionsEnt.push(entH!)
      } else {
        for (let i = 0; i < (entH! / H); i++) {
          this.dimensionsEnt.push(entH);
        };
        this.dimensionsEnt.push(((entH! % H) * H));
      }
    };

    //Calcul individu
    this.dimensionsInd = [];
    let dimensionsAutres : any[] = [];
    this.individus.forEach((ind, index) => {
      let cumulH: number = 0;
      let cumulCH: number = 0;

      let cumulNotesH: number = 0;
      let cumulnotesCH: number = 0;


      sections.forEach(section => {

        if (document.getElementById(section.concat(ind.id)) != null) {

          let secH = ((W * document.getElementById(section.concat(ind.id))?.clientHeight!) / document.getElementById(section.concat(ind.id))?.clientWidth!);
          if (section != 'notes') {
            if ((secH! + cumulH) < H) {
              cumulH += secH!;
              cumulCH += document.getElementById(section.concat(ind.id))?.clientHeight!;
            } else {
              this.dimensionsInd.push((cumulH * (document.getElementById(section.concat(ind.id))?.clientWidth!)) / W);

              cumulH = secH;
              cumulCH = document.getElementById(section.concat(ind.id))?.clientHeight!;
            }
          } else {
            if ((secH! + cumulNotesH) < H) {
              cumulNotesH += secH!;
              cumulnotesCH += document.getElementById(section.concat(ind.id))?.clientHeight!;
            } else {
              dimensionsAutres.push((cumulNotesH * (document.getElementById(section.concat(ind.id))?.clientWidth!)) / W);

              cumulNotesH = secH;
              cumulnotesCH = document.getElementById(section.concat(ind.id))?.clientHeight!;
            }
          }


          console.log('ind', index, ' heigth: ', document.getElementById(section.concat(ind.id))?.clientHeight, ' width: ',
            document.getElementById(section.concat(ind.id))?.clientWidth, 'adj H', secH, 'cumulCH', cumulCH, 'cumulH', cumulH);
        };
      });

      if (cumulH != 0) {
        this.dimensionsInd.push(cumulCH);
        cumulH = 0;
      };
      if (cumulNotesH != 0) {
        dimensionsAutres.push(cumulNotesH);
        cumulNotesH = 0;
      };
    });

    if (dimensionsAutres.length != 0){
      console.log('entered if dimensions autres, length : ', dimensionsAutres, 'd ind:');
      dimensionsAutres.forEach(sizePage => {
        this.dimensionsInd.push(sizePage);
      });
    }

    console.log('dimension entreprise', this.dimensionsEnt);
    console.log('dimension individu', this.dimensionsInd);

  };

  public testPDF(): void {
    this.calculsPDF();
    let DATAent: any = document.getElementById('dataSociete');
    let DATAind: any = document.getElementById('dataIndividu');
    let PDF = new jsPDF('p', 'mm', 'a4');

    let fileWidth = 208;
    let fileHeight = 295;

    let i: number = 1;

    html2canvas(DATAent).then((entCanvas) => {
      let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;
      console.log('calulated height ent: ', calculedHeightEnt);
      console.log('property height ent: ', entCanvas.height, entCanvas.width);

      var srcImg = entCanvas;
      var sX = 0;
      var sY = 0; // start 297 pixels down for every new page
      var sWidth = entCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX = 0;
      var dY = 0;
      var dWidth = 2480;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width = 2480;
      var height = 3508;
      PDF.setPage(1);

      console.log('t1');

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));
      console.log('t2');

      //conversion PDF de l'individu
      html2canvas(DATAind).then((canvas) => {
        console.log('Entered in Canvas Ind ');
        if (fileHeight == 0 || fileWidth == 0) {
          return;
        };
        console.log('canvas sizes', canvas.height, canvas.width);

        let cumulInd: number = 0;
        this.dimensionsInd.forEach((pageH, index) => {

          console.log('tloop', index, 'cumulInd', cumulInd);
          let cHeight = (fileHeight * canvas.width) / fileWidth;
          console.log('cHeight', cHeight);
          PDF.addPage('a4');
          PDF.setPage(index + 2);

          let pageCH = ((canvas.height * pageH) / document.getElementById('dataIndividu')?.clientHeight!);
          console.log('pageH', pageH, 'pageCH', pageCH, 'canvasH', canvas.height, 'clientH', document.getElementById('dataIndividu')?.clientHeight!)
          let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;

          var srcImg = canvas;
          var sX = 0;
          var sY = cumulInd; // start 297 pixels down for every new page
          var sWidth = canvas.width;
          var sHeight = pageCH
          var dX = 0;
          var dY = 0;
          var dWidth = 2480;
          var dHeight = (pageCH * 2480) / canvas.width;

          let onePageCanvas = document.createElement("canvas");
          onePageCanvas.width = 2480;
          onePageCanvas.height = 3508;

          var ctx = onePageCanvas.getContext('2d');
          ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

          PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));


          console.log('adapted page', pageCH, 'cumulInd', cumulInd);
          cumulInd += pageCH;
          if ((index + 1) == this.dimensionsInd.length) {
            console.log('enregistrement en att');
            PDF.save('angular-demo.pdf');
          }
        });
      });

    });
  };

  public testPDFold(): void {
    let DATAent: any = document.getElementById('dataSociete');
    let PDF = new jsPDF('p', 'mm', 'a4');

    let sections = ['description', 'consentement', 'statut', 'identite', 'remuneration', 'autres', 'signature', 'notes'];
    let fileWidth = 208;
    let fileHeight = 295;

    let i: number = 1;

    html2canvas(DATAent).then((entCanvas) => {
      let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;
      console.log('calulated height ent: ', calculedHeightEnt);
      console.log('property height ent: ', entCanvas.height, entCanvas.width);

      var srcImg = entCanvas;
      var sX = 0;
      var sY = 0; // start 297 pixels down for every new page
      var sWidth = entCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX = 0;
      var dY = 0;
      var dWidth = 2480;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width = 2480;
      var height = 3508;
      PDF.setPage(1);

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));

      this.individus.forEach((ind, index) => {

        let cumulH: number = 0;

        sections.forEach(section => {

          let varDoc: any = document.getElementById(section.concat(ind.id));

          html2canvas(varDoc).then((canvas) => {
            if (fileHeight == 0 || fileWidth == 0) {
              return;
            }
            let cHeight = (fileHeight * canvas.width) / fileWidth;



            if (section == 'description') {
              PDF.addPage('a4');
              i++;
              PDF.setPage(i);
              cumulH = canvas.height;
              console.log('cumulh desc', cumulH);

            } else {
              cumulH = cumulH + canvas.height;

              if (cumulH > canvas.height) {
                PDF.addPage('a4');
                i++;
                PDF.setPage(i);
                cumulH = canvas.height;
                console.log('cumulh desc', cumulH);
              }
              console.log('cumulh', cumulH);
            }

            // for (var i = 0; i <= (canvas.height/cHeight); i++) {
            let startPos = cHeight;

            var srcImg = canvas;
            var sX = 0;
            var sY = cHeight; // start 297 pixels down for every new page
            var sWidth = canvas.width;
            var sHeight = cHeight;
            var dX = 0;
            var dY = 0;
            var dWidth = 2480;
            var dHeight = 3508;

            let onePageCanvas = document.createElement("canvas");
            onePageCanvas.width = 2480;
            onePageCanvas.height = 3508;

            var ctx = onePageCanvas.getContext('2d');
            ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

            var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));

            console.log((this.individus.length - 1), index, section)
            if ((this.individus.length - 1) == index && section == 'notes') {
              console.log('enregistrement en att');
              PDF.save('angular-demo.pdf');
            }
          });
        });

      });

    });




  };

  espacement() {
    let DATAent: any = document.getElementById('dataSociete');
    let PDF = new jsPDF('p', 'mm', 'a4');

    let sections = ['description', 'consentement', 'statut', 'identite', 'remuneration', 'autres', 'signature', 'notes'];
    let fileWidth = 208;
    let fileHeight = 295;

    let i: number = 1;

    html2canvas(DATAent).then((entCanvas) => {
      let calculedHeightEnt = (fileHeight * entCanvas.width) / fileWidth;
      console.log('calulated height ent: ', calculedHeightEnt);
      console.log('property height ent: ', entCanvas.height, entCanvas.width);

      var srcImg = entCanvas;
      var sX = 0;
      var sY = 0; // start 297 pixels down for every new page
      var sWidth = entCanvas.width;
      var sHeight = calculedHeightEnt;
      var dX = 0;
      var dY = 0;
      var dWidth = 2480;
      var dHeight = 3508;

      let onePageCanvas = document.createElement("canvas");
      onePageCanvas.width = 2480;
      onePageCanvas.height = 3508;

      var ctx = onePageCanvas.getContext('2d');
      ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width = 2480;
      var height = 3508;
      PDF.setPage(1);

      PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));
    });

    this.individus.forEach(ind => {

      let cumulH: number = 0;

      sections.forEach(section => {

        let varDoc: any = document.getElementById(section.concat(ind.id));

        html2canvas(varDoc).then((canvas) => {
          let cHeight = (fileHeight * canvas.width) / fileWidth;



          if (section == 'description') {
            PDF.addPage('a4');
            i++;
            PDF.setPage(i);
            cumulH = canvas.height;
            console.log('cumulh desc', cumulH);

          } else {
            cumulH = cumulH + canvas.height;

            if (cumulH > canvas.height) {
              PDF.addPage('a4');
              i++;
              PDF.setPage(i);
              cumulH = canvas.height;
              console.log('cumulh desc', cumulH);
            }
            console.log('cumulh', cumulH);
          }

          // for (var i = 0; i <= (canvas.height/cHeight); i++) {
          let startPos = cHeight;

          var srcImg = canvas;
          var sX = 0;
          var sY = cHeight; // start 297 pixels down for every new page
          var sWidth = canvas.width;
          var sHeight = cHeight;
          var dX = 0;
          var dY = 0;
          var dWidth = 2480;
          var dHeight = 3508;

          let onePageCanvas = document.createElement("canvas");
          onePageCanvas.width = 2480;
          onePageCanvas.height = 3508;

          var ctx = onePageCanvas.getContext('2d');
          ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

          PDF.addImage(canvasDataURL, 'PNG', 5, 5, (fileWidth * 0.95), (fileHeight * 0.95));


          // }
        });
      });

    })
    PDF.save('angular-demo.pdf');

  }

  ngOnInit(): void {
    this.individu = this.dataService.getIndividu();
    this.entreprise = this.entrepriseService.getDataEntreprise();
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

    let DATAinds: any = document.getElementById('dataIndividu');
    this.ch = DATAinds.clientHeight;
    this.cw = DATAinds.clientWidth;

    html2canvas(DATAinds).then((canvas) => {
      console.log(canvas);
      console.log('canvas')
    });




  }

}
