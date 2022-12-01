import { Injectable } from '@angular/core';
import { Individu } from '../shared/interfaces/individus.interface';
interface DataItem {
  titre: string;
  valeur: any;
}

@Injectable({
  providedIn: 'root'
})
export class SharedStatutService {
  public blockNav: boolean = true;
  public minInfo: boolean = false;
  public consentementInd: boolean = true;
  public clotureInd: boolean = false;
  public refusInd: boolean = false;
  public signatureEnvoye: boolean = false;
  public statutIndividu: string = "salarie";
  public precedent: string = "";
  public idIndividu: string|number = "";

  dataIndividu: DataItem[] = [
    {
      titre: 'description',
      valeur: ''
    },
    {
      titre: 'refus',
      valeur: ''
    },
    {
      titre: 'nom',
      valeur: ''
    },
    {
      titre: 'prenom',
      valeur: ''
    },
    {
      titre: 'signature',
      valeur: ''
    },
    {
      titre: 'consentement',
      valeur: ''
    },
    {
      titre: 'statut',
      valeur: ''
    },
    {
      titre: 'fonction',
      valeur: ''
    },
    {
      titre: 'nir',
      valeur: ''
    },
    {
      titre: 'siret',
      valeur: ''
    },
    {
      titre: 'siren',
      valeur: ''
    },
    {
      titre: 'civilite',
      valeur: ''
    },
    {
      titre: 'typePI',
      valeur: ''
    },
    {
      titre: 'numeroPI',
      valeur: ''
    },
    {
      titre: 'dt_naissance',
      valeur: ''
    },
    {
      titre: 'lieu_naissance',
      valeur: ''
    },
    {
      titre: 'nationalite_fr',
      valeur: ''
    },
    {
      titre: 'pays_naissance',
      valeur: ''
    },
    {
      titre: 'tel',
      valeur: ''
    },
    {
      titre: 'n_voie',
      valeur: ''
    },
    {
      titre: 'bis',
      valeur: ''
    },
    {
      titre: 'libelle',
      valeur: ''
    },
    {
      titre: 'complement',
      valeur: ''
    },
    {
      titre: 'cp',
      valeur: ''
    },
    {
      titre: 'ville',
      valeur: ''
    },
    {
      titre: 'dt_creation',
      valeur: ''
    },
    {
      titre: 'type_statut',
      valeur: ''
    },
    {
      titre: 'emploi',
      valeur: ''
    },
    {
      titre: 'contrat',
      valeur: ''
    },
    {
      titre: 'dt_embauche',
      valeur: ''
    },
    {
      titre: 'duree',
      valeur: ''
    },
    {
      titre: 'cadre',
      valeur: ''
    },
    {
      titre: 'sbrut',
      valeur: ''
    },
    {
      titre: 'fsalaire',
      valeur: ''
    },
    {
      titre: 'montant',
      valeur: ''
    },
    {
      titre: 'remunere',
      valeur: ''
    },
    {
      titre: 'ca',
      valeur: ''
    },
    {
      titre: 'rmensuelle',
      valeur: ''
    },
    {
      titre: 'snombre',
      valeur: ''
    },
    {
      titre: 'total',
      valeur: ''
    },
    {
      titre: 'identites',
      valeur: ''
    },
    //41
    {
      titre: 'soustraitant',
      valeur: ''
    },
    {
      titre: 'identite_do',
      valeur: ''
    },
    {
      titre: 's_partie_activite',
      valeur: ''
    },
    {
      titre: 'id_soustraitants',
      valeur: ''
    },
    //45
    {
      titre: 'h_lun',
      valeur: true
    },
    {
      titre: 'h_mar',
      valeur: true
    },
    {
      titre: 'h_mer',
      valeur: true
    },
    {
      titre: 'h_jeu',
      valeur: true
    },
    {
      titre: 'h_ven',
      valeur: true
    },
    {
      titre: 'h_sam',
      valeur: ''
    },
    {
      titre: 'h_dim',
      valeur: ''
    },
    //52
    {
      titre: 'deb_lun',
      valeur: ''
    },
    {
      titre: 'deb_mar',
      valeur: ''
    },
    {
      titre: 'deb_mer',
      valeur: ''
    },
    {
      titre: 'deb_jeu',
      valeur: ''
    },
    {
      titre: 'deb_ven',
      valeur: ''
    },
    {
      titre: 'deb_sam',
      valeur: ''
    },
    {
      titre: 'deb_dim',
      valeur: ''
    },
    //59
    {
      titre: 'fin_lun',
      valeur: ''
    },
    {
      titre: 'fin_mar',
      valeur: ''
    },
    {
      titre: 'fin_mer',
      valeur: ''
    },
    {
      titre: 'fin_jeu',
      valeur: ''
    },
    {
      titre: 'fin_ven',
      valeur: ''
    },
    {
      titre: 'fin_sam',
      valeur: ''
    },
    {
      titre: 'fin_dim',
      valeur: ''
    },
    //66
    {
      titre: 'paus_lun',
      valeur: ''
    },
    {
      titre: 'paus_mar',
      valeur: ''
    },
    {
      titre: 'paus_mer',
      valeur: ''
    },
    {
      titre: 'paus_jeu',
      valeur: ''
    },
    {
      titre: 'paus_ven',
      valeur: ''
    },
    {
      titre: 'paus_sam',
      valeur: ''
    },
    {
      titre: 'paus_dim',
      valeur: ''
    },
    //73
    {
      titre: 'tot_lun',
      valeur: ''
    },
    {
      titre: 'tot_mar',
      valeur: ''
    },
    {
      titre: 'tot_mer',
      valeur: ''
    },

    {
      titre: 'tot_jeu',
      valeur: ''
    },
    {
      titre: 'tot_ven',
      valeur: ''
    },
    {
      titre: 'tot_sam',
      valeur: ''
    },
    {
      titre: 'tot_dim',
      valeur: ''
    },
    //80
    {
      titre: 'hSup_lun',
      valeur: ''
    },
    {
      titre: 'hSup_mar',
      valeur: ''
    },
    {
      titre: 'hSup_mer',
      valeur: ''
    },
    {
      titre: 'hSup_jeu',
      valeur: ''
    },
    {
      titre: 'hSup_ven',
      valeur: ''
    },
    {
      titre: 'hSup_sam',
      valeur: ''
    },
    {
      titre: 'hSup_dim',
      valeur: ''
    },
    //87
    {
      titre: 'debSup_lun',
      valeur: ''
    },
    {
      titre: 'debSup_mar',
      valeur: ''
    },
    {
      titre: 'debSup_mer',
      valeur: ''
    },
    {
      titre: 'debSup_jeu',
      valeur: ''
    },
    {
      titre: 'debSup_ven',
      valeur: ''
    },
    {
      titre: 'debSup_sam',
      valeur: ''
    },
    {
      titre: 'debSup_dim',
      valeur: ''
    },
    //94
    {
      titre: 'finSup_lun',
      valeur: ''
    },
    {
      titre: 'finSup_mar',
      valeur: ''
    },
    {
      titre: 'finSup_mer',
      valeur: ''
    },
    {
      titre: 'finSup_jeu',
      valeur: ''
    },
    {
      titre: 'finSup_ven',
      valeur: ''
    },
    {
      titre: 'finSup_sam',
      valeur: ''
    },
    {
      titre: 'finSup_dim',
      valeur: ''
    },
    //101
    {
      titre: 'pausSup_lun',
      valeur: ''
    },
    {
      titre: 'pausSup_mar',
      valeur: ''
    },
    {
      titre: 'pausSup_mer',
      valeur: ''
    },
    {
      titre: 'pausSup_jeu',
      valeur: ''
    },
    {
      titre: 'pausSup_ven',
      valeur: ''
    },
    {
      titre: 'pausSup_sam',
      valeur: ''
    },
    {
      titre: 'pausSup_dim',
      valeur: ''
    },
    //108
    {
      titre: 'totSup_lun',
      valeur: ''
    },
    {
      titre: 'totSup_mar',
      valeur: ''
    },
    {
      titre: 'totSup_mer',
      valeur: ''
    },
    {
      titre: 'totSup_jeu',
      valeur: ''
    },
    {
      titre: 'totSup_ven',
      valeur: ''
    },
    {
      titre: 'totSup_sam',
      valeur: ''
    },
    {
      titre: 'totSup_dim',
      valeur: ''
    },
    {
      titre: 'id',
      valeur: ''
    },
    {
      titre: 'idEnt',
      valeur: ''
    },
    {
      titre: 'denominationEnt',
      valeur: ''
    },
    {
      titre: 'siren_fiche',
      valeur: ''
    },
    {
      titre: 'adresse_siege',
      valeur: ''
    },
    {
      titre: 'denominationI',
      valeur: ''
    },
    {
      titre: 'adresse_siegeI',
      valeur: ''
    },
    {
      titre: 'timeIndividu',
      valeur: ''
    },
  ]

  constructor() { }

  get idindividu(): string|number {
    return this.idIndividu;
  }
  set newidindividu(val: string|number) {
    this.idIndividu = val;
  }
  get blocknav(): boolean {
    return this.blockNav;
  }
  set newblocknav(val: boolean) {
    this.blockNav = val;
  }
  get mininfo(): boolean {
    return this.minInfo;
  }
  set newmininfo(val: boolean) {
    this.minInfo = val;
  }
  get statutind(): string {
    return this.statutIndividu;
  }
  set newStatut(val: string) {
    this.statutIndividu = val;
  }
  get precedentind(): string {
    return this.precedent;
  }
  set newPrecedent(val: string) {
    this.precedent = val;
  }
  get consentementind(): boolean {
    return this.consentementInd;
  }
  set newconsentement(val: boolean) {
    this.consentementInd = val;
  }
  get clotureind(): boolean {
    return this.clotureInd;
  }
  set newcloture(val: boolean) {
    this.clotureInd = val;
  }
  get refusind(): boolean {
    return this.refusInd;
  }
  set newrefusind(val: boolean) {
    this.refusInd = val;
  }
  get signatureind(): boolean {
    return this.signatureEnvoye;
  }
  set newsignatureind(val: boolean) {
    this.signatureEnvoye = val;
  }
  get dataind(): DataItem[] {
    return this.dataIndividu;
  }
  set newData(val: DataItem[]) {
    this.dataIndividu = val;
  }

  synchro(data: Individu) {
    // this.data = this.getHeroes();
    this.newidindividu = data.id;

    console.log("id individu...");
    console.log(data.id);
    
    this.dataind[0].valeur = data.description;
    this.dataind[1].valeur = data.refus;
    this.dataind[2].valeur = data.nom;
    this.dataind[3].valeur = data.prenom;
    this.dataind[4].valeur = data.signature;
    this.dataind[5].valeur = data.consentement;
    this.dataind[6].valeur = data.statut;
    this.dataind[7].valeur = data.fonction;
    this.dataind[8].valeur = data.nir;
    this.dataind[9].valeur = data.siret;
    this.dataind[10].valeur = data.siren;
    this.dataind[11].valeur = data.civilite;
    this.dataind[12].valeur = data.typePI;
    this.dataind[13].valeur = data.numeroPI;
    this.dataind[14].valeur = data.dt_naissance;
    this.dataind[15].valeur = data.lieu_naissance;
    this.dataind[16].valeur = data.nationalite_fr;
    this.dataind[17].valeur = data.pays_naissance;
    this.dataind[18].valeur = data.tel;
    this.dataind[19].valeur = data.n_voie;
    this.dataind[20].valeur = data.bis;
    this.dataind[21].valeur = data.libelle;
    this.dataind[22].valeur = data.complement;
    this.dataind[23].valeur = data.cp;
    this.dataind[24].valeur = data.ville;
    this.dataind[25].valeur = data.dt_creation;
    this.dataind[26].valeur = data.type_statut;
    this.dataind[27].valeur = data.emploi;
    this.dataind[28].valeur = data.contrat;
    this.dataind[29].valeur = data.dt_embauche;
    this.dataind[30].valeur = data.duree;
    this.dataind[31].valeur = data.cadre;
    this.dataind[32].valeur = data.sbrut;
    this.dataind[33].valeur = data.fsalaire;
    this.dataind[34].valeur = data.montant;
    this.dataind[35].valeur = data.remunere;
    this.dataind[36].valeur = data.ca;
    this.dataind[37].valeur = data.rmensuelle;
    this.dataind[38].valeur = data.snombre;
    this.dataind[39].valeur = data.total;
    this.dataind[40].valeur = data.identites;
    this.dataind[41].valeur = data.soustraitant;
    this.dataind[42].valeur = data.identite_do;
    this.dataind[43].valeur = data.s_partie_activite;
    this.dataind[44].valeur = data.id_soustraitants;
    this.dataind[45].valeur = data.h_lun;
    this.dataind[46].valeur = data.h_mar;
    this.dataind[47].valeur = data.h_mer;
    this.dataind[48].valeur = data.h_jeu;
    this.dataind[49].valeur = data.h_ven;
    this.dataind[50].valeur = data.h_sam;
    this.dataind[51].valeur = data.h_dim;
    this.dataind[52].valeur = data.deb_lun;
    this.dataind[53].valeur = data.deb_mar;
    this.dataind[54].valeur = data.deb_mer;
    this.dataind[55].valeur = data.deb_jeu;
    this.dataind[56].valeur = data.deb_ven;
    this.dataind[57].valeur = data.deb_sam;
    this.dataind[58].valeur = data.deb_dim;
    this.dataind[59].valeur = data.fin_lun;
    this.dataind[60].valeur = data.fin_mar;
    this.dataind[61].valeur = data.fin_mer;
    this.dataind[62].valeur = data.fin_jeu;
    this.dataind[63].valeur = data.fin_ven;
    this.dataind[64].valeur = data.fin_sam;
    this.dataind[65].valeur = data.fin_dim;
    this.dataind[66].valeur = data.paus_lun;
    this.dataind[67].valeur = data.paus_mar;
    this.dataind[68].valeur = data.paus_mer;
    this.dataind[69].valeur = data.paus_jeu;
    this.dataind[70].valeur = data.paus_ven;
    this.dataind[71].valeur = data.paus_sam;
    this.dataind[72].valeur = data.paus_dim;
    this.dataind[73].valeur = data.tot_lun;
    this.dataind[74].valeur = data.tot_mar;
    this.dataind[75].valeur = data.tot_mer;
    this.dataind[76].valeur = data.tot_jeu;
    this.dataind[77].valeur = data.tot_ven;
    this.dataind[78].valeur = data.tot_sam;
    this.dataind[79].valeur = data.tot_dim;
    this.dataind[80].valeur = data.hSup_lun;
    this.dataind[81].valeur = data.hSup_mar;
    this.dataind[82].valeur = data.hSup_mer;
    this.dataind[83].valeur = data.hSup_jeu;
    this.dataind[84].valeur = data.hSup_ven;
    this.dataind[85].valeur = data.hSup_sam;
    this.dataind[86].valeur = data.hSup_dim;
    this.dataind[87].valeur = data.debSup_lun;
    this.dataind[88].valeur = data.debSup_mar;
    this.dataind[89].valeur = data.debSup_mer;
    this.dataind[90].valeur = data.debSup_jeu;
    this.dataind[91].valeur = data.debSup_ven;
    this.dataind[92].valeur = data.debSup_sam;
    this.dataind[93].valeur = data.debSup_dim;
    this.dataind[94].valeur = data.finSup_lun;
    this.dataind[95].valeur = data.finSup_mar;
    this.dataind[96].valeur = data.finSup_mer;
    this.dataind[97].valeur = data.finSup_jeu;
    this.dataind[98].valeur = data.finSup_ven;
    this.dataind[99].valeur = data.finSup_sam;
    this.dataind[100].valeur = data.finSup_dim;
    this.dataind[101].valeur = data.pausSup_lun;
    this.dataind[102].valeur = data.pausSup_mar;
    this.dataind[103].valeur = data.pausSup_mer;
    this.dataind[104].valeur = data.pausSup_jeu;
    this.dataind[105].valeur = data.pausSup_ven;
    this.dataind[106].valeur = data.pausSup_sam;
    this.dataind[107].valeur = data.pausSup_dim;
    this.dataind[108].valeur = data.totSup_lun;
    this.dataind[109].valeur = data.totSup_mar;
    this.dataind[110].valeur = data.totSup_mer;
    this.dataind[111].valeur = data.totSup_jeu;
    this.dataind[112].valeur = data.totSup_ven;
    this.dataind[113].valeur = data.totSup_sam;
    this.dataind[114].valeur = data.totSup_dim;
    this.dataind[115].valeur = data.id;
    this.dataind[116].valeur = data.idEnt;
    this.dataind[117].valeur = data.denominationEnt;
    this.dataind[118].valeur = data.siren_fiche;
    this.dataind[119].valeur = data.adresse_siege;
    this.dataind[120].valeur = data.denominationI;
    this.dataind[121].valeur = data.adresse_siegeI;

    this.consentementInd = this.dataind[5].valeur;
    this.signatureEnvoye = this.dataind[5].valeur;
    this.blockNav= !this.dataind[5].valeur;
    console.log('result')
    console.log(this.dataind[115].valeur)

  }

  

}
