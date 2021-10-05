export interface IPatient {
  id: number;
  name: string;
  lastName: string;
  phone: string;
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
