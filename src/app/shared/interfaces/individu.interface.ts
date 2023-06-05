import { TimeoutError } from "rxjs";

export interface Ind {
    id: string;
    refus: boolean;
    consentement: boolean;
    archived: boolean;
    date: string;
    heure: string;
    description: string;
    nom: string;
    prenom: string;
    typePI: string;
    numeroPI: string;
    signature: string;
    statut: string;
    fonction: string;
    nir: string;
    type_statut: string;
    dt_creation: string;
    autre_statut: string;
    siret: string;
    siren: string;

    civilite: string;
    dt_naissance: string;
    lieu_naissance: string;
    nationalite_fr: string;
    pays_naissance: string;
    tel: string;

    adresse_perso: string;
    cp_perso: string;
    ville_perso: string;
    difference_adresse: boolean;
    adresse_pro: string;
    cp_pro: string;
    ville_pro: string;

    emploi: string;
    contrat: string;
    interimaire: boolean;
    sirenI: string;
    denominationI: string;
    adresse_siegeI: string;
    dt_embauche: string;
    duree: string;
    bullentins: string;
    hsup: string;
    sbrut: string;
    fsalaire: string;
    typeVersement: string;
    autreVersement: string;
    montant: string;
    remunere: string;
    ca: string;
    rmensuelle: string;
    snombre: string;
    total: string;
    identites: string;
    soustraitant: string;
    identite_do: string;
    s_partie_activite: string;
    id_soustraitants: string;
    lundi: horaireJour;
    mardi: horaireJour;
    mercredi: horaireJour;
    jeudi: horaireJour;
    vendredi: horaireJour;
    samedi: horaireJour;
    dimanche: horaireJour;
    lundiSup: horaireJour;
    mardiSup: horaireJour;
    mercrediSup: horaireJour;
    jeudiSup: horaireJour;
    vendrediSup: horaireJour;
    samediSup: horaireJour;
    dimancheSup: horaireJour;
    totalSem: string;
    replique: horaireJour;
    idEnt: string;
    denominationEnt: string;
    siren_fiche: string;
    adresse_siege: string;
    idEntPerso: string;
    denominationEntPerso: string;
    siren_fichePerso: string;
    adresse_siegePerso: string;
    signature_cloture: string;
    refus_signature: boolean;
    notesInd: cardNote[];
    infos: informations;

}

export interface notes {
    heure: Date | string,
    note: string,
    nom: string
}

export interface noms {
    id: number | string,
    nom: string
}

export interface horaireJour {
    active: boolean | string,
    debut: Date | string,
    fin: Date | string,
    pause: Date | string,
    total: Date | string
}

export interface cardNote {
    heure: Date | string,
    note: string,
    type: string,
    id: string | number,
    titre: string,
    nom: string
}

export interface champ {
    col : string,
    titre : string,
}
export interface data {
    source : string,
    vide : boolean,
    new : boolean,
    champs : champ[],
}

export interface informations {
    retour_systeme: string,
    rei_siren: string,
    rei_denomination: string,
    rei_code_naf: string,
    rei_dt_creation: string,
    rei_dt_debut: string,
    rei_voie: string,
    rei_siret: string,
    rei_urssaf: string,
    rei_cp: string,
    rei_cp_insee: string,
    rei_comune: string,
    rei_dt_fin: string,
    rei_qualite_dir: string,
    rei_nom: string,
    rei_prenom: string,
    rei_dt_naiss: string,
    rei_lieu_naiss: string,
    rei_titre: string,
    rei_num_cext: string,
    rei_num_cint: string,
    dpae_siret: string,
    dpae_nom: string,
    dpae_prenom: string,
    dpae_dt_naiss: string,
    dpae_dt_emb: string,
    dpae_hr_emb: string,
    dpae_dt_decl: string,
    dpae_hr_decl: string,
    dsn_adresse: string,
    dsn_activite: string,
    dsn_contrat: string,
    dsn_dt_emb: string,
    dsn_duree: string,
    dsn_s_brut: string,
    dsn_dernier_mois: string,
    dsn_total: string,
    dsn_nom: string,
    dsn_prenom: string,
    dsn_dt_naiss: string,
    dsn_debut_contrat: string,
    dsn_nir: string,
    obp7_num_compte: string,
    obp7_to: string,
    obp7_periode: string,
    caae_num_compte: string,
    caae_periodes: string,
    caae_ca: string,
    opc_num_intervention: string,
    opc_dt_creation: string,
    opc_realisateur: string,
    opc_action: string,
    opc_pilote: string,
    opc_delegue: string,
    opc_etat: string,
    opc_dt_etat: string
    [key: string]: string; // Index signature
}

export interface totauxHoraires {
    total: Date,
    total_lun: Date,
    total_mar: Date,
    total_mer: Date,
    total_jeu: Date,
    total_ven: Date,
    total_sam: Date,
    total_dim: Date,
    total_lunS: Date,
    total_marS: Date,
    total_merS: Date,
    total_jeuS: Date,
    total_venS: Date,
    total_samS: Date,
    total_dimS: Date
}