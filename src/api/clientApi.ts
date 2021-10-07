// import { AxiosError, AxiosResponse } from "axios";
import { instance, authInstance } from "./axiosInstance";
import { IPatientForm } from '../types/patientsTypes';

interface IPatientFormForBackend {
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
  conditions: string[],
  otherCondition: string,
  diseases: string[],
  medications: string,
  covidTestedPositive: boolean | null,
  covidVaccine: boolean | null,
  stressfulLevel: string,
  relationshipChild: string,
}

const formatRequestData = (modifyDataForBackend: IPatientForm): IPatientFormForBackend => {
  const params = {
    firstName: modifyDataForBackend.firstName,
    lastName: modifyDataForBackend.lastName,
    birthday: modifyDataForBackend.birthday,
    address: modifyDataForBackend.address,
    city: modifyDataForBackend.city,
    state: modifyDataForBackend.state,
    zip: modifyDataForBackend.zip,
    phone: modifyDataForBackend.phone,
    email: modifyDataForBackend.email,
    referring: modifyDataForBackend.referring,
    conditions: Array.from(modifyDataForBackend.conditions),
    diseases: Array.from(modifyDataForBackend.diseases),
    medications: modifyDataForBackend.medications,
    covidTestedPositive: modifyDataForBackend.covidTestedPositive,
    covidVaccine: modifyDataForBackend.covidVaccine,
    stressfulLevel: modifyDataForBackend.stressfulLevel,
    consentMinorChild: modifyDataForBackend.consentMinorChild,

    otherCondition: modifyDataForBackend.checkedOtherCondition ? modifyDataForBackend.otherCondition : "",
    relationshipChild: modifyDataForBackend.relationshipChild,
  };
  return params;
};

interface IClientQueue {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
}

export const clientApi = {

  registrationClient: async (data: IPatientForm): Promise<void> => {

    console.log('dataReqPatient =>', data);

    try {
      const response = await authInstance
      .post('api/client/registration', formatRequestData(data))
      console.log(`response received successfully `, response.data);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST: error message => ${error.message}`);
      console.log("error.response.data) => ", error.response.data);
      throw new Error(error.message);
    }
  },

  addClientToQueue: async (data: IClientQueue): Promise<void> => {

    console.log('dataReqAddPatient =>', data);

    try {
      const response = await instance
      .post('api/client/add_clients_queue', data)
      console.log('response received successfully ', response.data);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors

      console.log("error message addClientToQueue => ", new Error(error.message));
      console.log('POST: error data  addClientToQueue =>', error.message.data);
      throw new Error(error.message);
    }
  },
};
