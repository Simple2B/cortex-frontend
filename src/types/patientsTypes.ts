export interface IPatient {
  api_key: string,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
};

export interface IPatientForm {
  firstName: string,
  lastName: string,
  birthday: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  phone: string,
  email: string,
  referring: string,
  conditions: Set<string>,
  conditionError: string,
  checkedOtherCondition: boolean,
  otherCondition: string,
  diseases: Set<string>,
  diseaseError: string,
  medications: string,
  covidTestedPositive: boolean | null,
  covidVaccine: boolean | null,
  stressfulLevel: string,
  consentMinorChild: boolean,
  relationshipChild: string,
};

export enum ClientActionTypes {
  ADD_CLIENT = 'ADD_CLIENT',
}

export interface IClientAction {
  type: ClientActionTypes.ADD_CLIENT;
  payload: IPatientForm;
}

export interface User {
  api_key: string,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
}
