import { TimeoutError } from "rxjs";

export interface Ind {
    id:                string;
    refus:             boolean;
    consentement:      boolean;
    archived:          boolean;
    date:              string;
    heure:             string;
    description:       string;
    nom:               string;
    prenom:            string;
    typePI:            string;
    numeroPI:          string;
    signature:         string;
    statut:            string;
    fonction:          string;
    nir:               string;
    siret:             string;
    siren:             string;
    civilite:          string;
    dt_naissance:      string;
    lieu_naissance:    string;
    nationalite_fr:    string;
    pays_naissance:    string;
    tel:               string;
    n_voie:            string;
    bis:               string;
    libelle:           string;
    complement:        string;
    cp:                string;
    ville:             string;
    dt_creation:       string;
    type_statut:       string;
    autre_statut:      string;
    emploi:            string;
    contrat:           string;
    interimaire:       boolean;
    sirenI:            string;
    denominationI:     string;
    adresse_siegeI:    string;
    dt_embauche:       string;
    duree:             string;
    bullentins:        string;
    hsup:              string;
    sbrut:             string;
    fsalaire:          string;
    montant:           string;
    remunere:          string;
    ca:                string;
    rmensuelle:        string;
    snombre:           string;
    total:             string;
    identites:         string;
    soustraitant:      string;
    identite_do:       string;
    s_partie_activite: string;
    id_soustraitants:  string;
    lundi:             horaireJour;
    mardi:             horaireJour;
    mercredi:          horaireJour;
    jeudi:             horaireJour;
    vendredi:          horaireJour;
    samedi:            horaireJour;
    dimanche:          horaireJour;
    lundiSup:          horaireJour;
    mardiSup:          horaireJour;
    mercrediSup:       horaireJour;
    jeudiSup:          horaireJour;
    vendrediSup:       horaireJour;
    samediSup:         horaireJour;
    dimancheSup:       horaireJour;
    totalSem:          string;
    replique:          horaireJour;
    idEnt:             string;
    denominationEnt:   string;
    siren_fiche:       string;
    adresse_siege:     string;
    signature_cloture: string;
    notesInd:          cardNote[];   
    
}

export interface notes {
    heure: Date | string,
    note : string,
    nom : string
}

export interface noms {
    id: number | string,
    nom : string
}

export interface horaireJour {
    active: boolean | string,
    debut : Date | string,
    fin : Date | string, 
    pause : Date | string,
    total : Date | string
}

export interface cardNote {
    heure: Date | string,
    note : string,
    type : string,
    id :   string | number,
    titre : string,
    nom :  string
}

export interface totauxHoraires {
    total     : Date,
    total_lun : Date,
    total_mar : Date,
    total_mer : Date,
    total_jeu : Date,
    total_ven : Date,
    total_sam : Date,
    total_dim : Date,
    total_lunS: Date,
    total_marS: Date,
    total_merS: Date,
    total_jeuS: Date,
    total_venS: Date,
    total_samS: Date,
    total_dimS: Date
}