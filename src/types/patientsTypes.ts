export interface IPatient {
  api_key: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface IPatientForm {
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  referring: string;
  conditions: Set<string>;
  conditionError: string;
  checkedOtherCondition: boolean;
  otherCondition: string;
  diseases: Set<string>;
  diseaseError: string;
  medications: string;
  covidTestedPositive: boolean | null;
  covidVaccine: boolean | null;
  stressfulLevel: string;
  consentMinorChild: boolean;
  diagnosticProcedures: boolean;
  // relationshipChild: string,
}

export interface Test {
  id: number,
  care_plan_id: number,
  client_id: number,
  date: string,
  doctor_id: number,
}

export interface User {
  id: number;
  api_key: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  place_in_queue: number | null;
  rougue_mode: boolean | null;
  progress_date: string | null,
  req_date: string | null;
  tests: Test[];
  visits: [];
}

export type ICurrentCarePlanId = number;

export enum ClientActionTypes {
  ADD_CLIENT = "ADD_CLIENT",
  GET_CLIENTS = "GET_CLIENTS",
  ADD_CURRENT_CARE_PLAN_ID = "CURRENT_CARE_PLAN_ID",
}

interface ICurrentCarePlanIdAction {
  type: ClientActionTypes.ADD_CURRENT_CARE_PLAN_ID;
  payload: ICurrentCarePlanId;
}

interface IAddClientAction {
  type: ClientActionTypes.ADD_CLIENT;
  payload: IPatientForm;
}

interface IGetClientAction {
  type: ClientActionTypes.GET_CLIENTS;
  payload: IPatient[];
}

export type ClientAction = IAddClientAction | IGetClientAction | ICurrentCarePlanIdAction;
