import { Client } from "../api/clientApi";

export interface IVisit {
    date: string;
    client_id: number | null;
    doctor_id: number | null;
    id: number | null;
    start_time: string | null;
    end_time: string | null;
  }


export interface IClientInfo extends Client {
    visits: Array<IVisit>;
  }

export interface INote {
    api_key: string;
    date: string;
    doctor_id: number;
    id: number;
    notes: string;
    visit_id: number;
}

export interface IConsult {
    client_id: number;
    date: string;
    doctor_id: number;
    id: number;
    consult: string;
    visit_id: number;
}

export const ClientInfo = {
    id: null,
    firstName: "",
    lastName: "",
    birthday: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    referring: "",
    conditions: [],
    otherCondition: "",
    diseases: [],
    medications: "",
    covidTestedPositive: "",
    covidVaccine: "",
    stressfulLevel: 1,
    consentMinorChild: false,
    diagnosticProcedures: false,
    // relationshipChild: "",
    place_in_queue: null,
    visits: [
        {
        date: "",
        client_id: null,
        doctor_id: null,
        id: null,
        start_time: null,
        end_time: null,
        },
    ],
};
