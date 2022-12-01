// To parse this data:
//
//   import { Convert, Individu } from "./file";
//
//   const individu = Convert.toIndividu(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Individu {
    id:                number | string;
    description:       string;
    refus:             boolean| string ;
    nom:               string;
    prenom:            string;
    signature:         string;
    consentement:      boolean | string;
    statut:            string;
    fonction:          string;
    nir:               string;
    siret:             string;
    siren:             string;
    civilite:          string;
    typePI:            string;
    numeroPI:          string;
    dt_naissance:      Date | string;
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
    emploi:            string;
    contrat:           string;
    dt_embauche:       string;
    duree:             string;
    cadre:             string;
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
    h_lun:             boolean | string;
    h_mar:             boolean | string;
    h_mer:             boolean | string;
    h_jeu:             boolean | string;
    h_ven:             boolean | string;
    h_sam:             boolean |string;
    h_dim:             boolean |string;
    deb_lun:           Date | number |string;
    deb_mar:           Date | number |string;
    deb_mer:           Date | number |string;
    deb_jeu:           Date | number |string;
    deb_ven:           Date | number |string;
    deb_sam:           Date | number |string;
    deb_dim:           Date | number |string;
    fin_lun:           Date | number |string;
    fin_mar:           Date | number |string;
    fin_mer:           Date | number |string;
    fin_jeu:           Date | number |string;
    fin_ven:           Date | number |string;
    fin_sam:           Date | number |string;
    fin_dim:           Date | number |string;
    paus_lun:          Date | number |string;
    paus_mar:          Date | number |string;
    paus_mer:          Date | number |string;
    paus_jeu:          Date | number |string;
    paus_ven:          Date | number |string;
    paus_sam:          Date | number |string;
    paus_dim:          Date | number |string;
    tot_lun:           Date | number |string;
    tot_mar:           Date | number |string;
    tot_mer:           Date | number |string;
    tot_jeu:           Date | number |string;
    tot_ven:           Date | number |string;
    tot_sam:           Date | number |string;
    tot_dim:           Date | number |string;
    hSup_lun:          Date | number |string;
    hSup_mar:          Date | number |string;
    hSup_mer:          Date | number |string;
    hSup_jeu:          Date | number |string;
    hSup_ven:          Date | number |string;
    hSup_sam:          Date | number |string;
    hSup_dim:          Date | number |string;
    debSup_lun:        Date | number |string;
    debSup_mar:        Date | number |string;
    debSup_mer:        Date | number |string;
    debSup_jeu:        Date | number |string;
    debSup_ven:        Date | number |string;
    debSup_sam:        Date | number |string;
    debSup_dim:        Date | number |string;
    finSup_lun:        Date | number |string;
    finSup_mar:        Date | number |string;
    finSup_mer:        Date | number |string;
    finSup_jeu:        Date | number |string;
    finSup_ven:        Date | number |string;
    finSup_sam:        Date | number |string;
    finSup_dim:        Date | number |string;
    pausSup_lun:       Date | number |string;
    pausSup_mar:       Date | number |string;
    pausSup_mer:       Date | number |string;
    pausSup_jeu:       Date | number |string;
    pausSup_ven:       Date | number |string;
    pausSup_sam:       Date | number |string;
    pausSup_dim:       Date | number |string;
    totSup_lun:        Date | number |string;
    totSup_mar:        Date | number |string;
    totSup_mer:        Date | number |string;
    totSup_jeu:        Date | number |string;
    totSup_ven:        Date | number |string;
    totSup_sam:        Date | number |string;
    totSup_dim:        Date | number |string;
    idEnt:             string;
    denominationEnt:   string;
    siren_fiche:       string;
    adresse_siege:     string;
    denominationI:     string;
    adresse_siegeI:    string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIndividu(json: string): Individu {
        return cast(JSON.parse(json), r("Individu"));
    }

    public static individuToJson(value: Individu): string {
        return JSON.stringify(uncast(value, r("Individu")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Individu": o([
        { json: "id", js: "id", typ: 0 },
        { json: "description", js: "description", typ: "" },
        { json: "refus", js: "refus", typ: true },
        { json: "nom", js: "nom", typ: "" },
        { json: "prenom", js: "prenom", typ: "" },
        { json: "signature", js: "signature", typ: "" },
        { json: "consentement", js: "consentement", typ: true },
        { json: "statut", js: "statut", typ: "" },
        { json: "fonction", js: "fonction", typ: "" },
        { json: "nir", js: "nir", typ: "" },
        { json: "siret", js: "siret", typ: "" },
        { json: "siren", js: "siren", typ: "" },
        { json: "civilite", js: "civilite", typ: "" },
        { json: "typePI", js: "typePI", typ: "" },
        { json: "numeroPI", js: "numeroPI", typ: "" },
        { json: "dt_naissance", js: "dt_naissance", typ: Date },
        { json: "lieu_naissance", js: "lieu_naissance", typ: "" },
        { json: "nationalite_fr", js: "nationalite_fr", typ: "" },
        { json: "pays_naissance", js: "pays_naissance", typ: "" },
        { json: "tel", js: "tel", typ: "" },
        { json: "n_voie", js: "n_voie", typ: "" },
        { json: "bis", js: "bis", typ: "" },
        { json: "libelle", js: "libelle", typ: "" },
        { json: "complement", js: "complement", typ: "" },
        { json: "cp", js: "cp", typ: "" },
        { json: "ville", js: "ville", typ: "" },
        { json: "dt_creation", js: "dt_creation", typ: "" },
        { json: "type_statut", js: "type_statut", typ: "" },
        { json: "emploi", js: "emploi", typ: "" },
        { json: "contrat", js: "contrat", typ: "" },
        { json: "dt_embauche", js: "dt_embauche", typ: "" },
        { json: "duree", js: "duree", typ: "" },
        { json: "cadre", js: "cadre", typ: "" },
        { json: "sbrut", js: "sbrut", typ: "" },
        { json: "fsalaire", js: "fsalaire", typ: "" },
        { json: "montant", js: "montant", typ: "" },
        { json: "remunere", js: "remunere", typ: "" },
        { json: "ca", js: "ca", typ: "" },
        { json: "rmensuelle", js: "rmensuelle", typ: "" },
        { json: "snombre", js: "snombre", typ: "" },
        { json: "total", js: "total", typ: "" },
        { json: "identites", js: "identites", typ: "" },
        { json: "soustraitant", js: "soustraitant", typ: "" },
        { json: "identite_do", js: "identite_do", typ: "" },
        { json: "s_partie_activite", js: "s_partie_activite", typ: "" },
        { json: "id_soustraitants", js: "id_soustraitants", typ: "" },
        { json: "h_lun", js: "h_lun", typ: true },
        { json: "h_mar", js: "h_mar", typ: true },
        { json: "h_mer", js: "h_mer", typ: true },
        { json: "h_jeu", js: "h_jeu", typ: true },
        { json: "h_ven", js: "h_ven", typ: true },
        { json: "h_sam", js: "h_sam", typ: "" },
        { json: "h_dim", js: "h_dim", typ: "" },
        { json: "deb_lun", js: "deb_lun", typ: "" },
        { json: "deb_mar", js: "deb_mar", typ: "" },
        { json: "deb_mer", js: "deb_mer", typ: "" },
        { json: "deb_jeu", js: "deb_jeu", typ: "" },
        { json: "deb_ven", js: "deb_ven", typ: "" },
        { json: "deb_sam", js: "deb_sam", typ: "" },
        { json: "deb_dim", js: "deb_dim", typ: "" },
        { json: "fin_lun", js: "fin_lun", typ: "" },
        { json: "fin_mar", js: "fin_mar", typ: "" },
        { json: "fin_mer", js: "fin_mer", typ: "" },
        { json: "fin_jeu", js: "fin_jeu", typ: "" },
        { json: "fin_ven", js: "fin_ven", typ: "" },
        { json: "fin_sam", js: "fin_sam", typ: "" },
        { json: "fin_dim", js: "fin_dim", typ: "" },
        { json: "paus_lun", js: "paus_lun", typ: "" },
        { json: "paus_mar", js: "paus_mar", typ: "" },
        { json: "paus_mer", js: "paus_mer", typ: "" },
        { json: "paus_jeu", js: "paus_jeu", typ: "" },
        { json: "paus_ven", js: "paus_ven", typ: "" },
        { json: "paus_sam", js: "paus_sam", typ: "" },
        { json: "paus_dim", js: "paus_dim", typ: "" },
        { json: "tot_lun", js: "tot_lun", typ: "" },
        { json: "tot_mar", js: "tot_mar", typ: "" },
        { json: "tot_mer", js: "tot_mer", typ: "" },
        { json: "tot_jeu", js: "tot_jeu", typ: "" },
        { json: "tot_ven", js: "tot_ven", typ: "" },
        { json: "tot_sam", js: "tot_sam", typ: "" },
        { json: "tot_dim", js: "tot_dim", typ: "" },
        { json: "hSup_lun", js: "hSup_lun", typ: "" },
        { json: "hSup_mar", js: "hSup_mar", typ: "" },
        { json: "hSup_mer", js: "hSup_mer", typ: "" },
        { json: "hSup_jeu", js: "hSup_jeu", typ: "" },
        { json: "hSup_ven", js: "hSup_ven", typ: "" },
        { json: "hSup_sam", js: "hSup_sam", typ: "" },
        { json: "hSup_dim", js: "hSup_dim", typ: "" },
        { json: "debSup_lun", js: "debSup_lun", typ: "" },
        { json: "debSup_mar", js: "debSup_mar", typ: "" },
        { json: "debSup_mer", js: "debSup_mer", typ: "" },
        { json: "debSup_jeu", js: "debSup_jeu", typ: "" },
        { json: "debSup_ven", js: "debSup_ven", typ: "" },
        { json: "debSup_sam", js: "debSup_sam", typ: "" },
        { json: "debSup_dim", js: "debSup_dim", typ: "" },
        { json: "finSup_lun", js: "finSup_lun", typ: "" },
        { json: "finSup_mar", js: "finSup_mar", typ: "" },
        { json: "finSup_mer", js: "finSup_mer", typ: "" },
        { json: "finSup_jeu", js: "finSup_jeu", typ: "" },
        { json: "finSup_ven", js: "finSup_ven", typ: "" },
        { json: "finSup_sam", js: "finSup_sam", typ: "" },
        { json: "finSup_dim", js: "finSup_dim", typ: "" },
        { json: "pausSup_lun", js: "pausSup_lun", typ: "" },
        { json: "pausSup_mar", js: "pausSup_mar", typ: "" },
        { json: "pausSup_mer", js: "pausSup_mer", typ: "" },
        { json: "pausSup_jeu", js: "pausSup_jeu", typ: "" },
        { json: "pausSup_ven", js: "pausSup_ven", typ: "" },
        { json: "pausSup_sam", js: "pausSup_sam", typ: "" },
        { json: "pausSup_dim", js: "pausSup_dim", typ: "" },
        { json: "totSup_lun", js: "totSup_lun", typ: "" },
        { json: "totSup_mar", js: "totSup_mar", typ: "" },
        { json: "totSup_mer", js: "totSup_mer", typ: "" },
        { json: "totSup_jeu", js: "totSup_jeu", typ: "" },
        { json: "totSup_ven", js: "totSup_ven", typ: "" },
        { json: "totSup_sam", js: "totSup_sam", typ: "" },
        { json: "totSup_dim", js: "totSup_dim", typ: "" },
        { json: "idEnt", js: "idEnt", typ: "" },
        { json: "denominationEnt", js: "denominationEnt", typ: "" },
        { json: "siren_fiche", js: "siren_fiche", typ: "" },
        { json: "adresse_siege", js: "adresse_siege", typ: "" },
        { json: "denominationI", js: "denominationI", typ: "" },
        { json: "adresse_siegeI", js: "adresse_siegeI", typ: "" },
    ], false),
};
