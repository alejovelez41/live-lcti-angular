import { cardNote, notes } from "./individu.interface";

export interface Controle {
    id:            string|number;
    nomControle:          string;
    newControle:         boolean;
    etat:                 string;
    dt_controle:          string;
    hr_controle:          string;
    lieu_controle:        string;
    inspecteurs_controle:  any[];
    partenaires_controle:  any[];
    autre_partenaire:     string;
    entreprises_controle:  any[];
    individus_controle:    any[];
    notesCont:           cardNote[];   

}

export interface Inspecteur {
    control : string,
    nom : string, 
    region : string

}

export interface Partenaire {
    control : string,
    nom : string, 
}