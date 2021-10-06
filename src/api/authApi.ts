// import { AxiosError, AxiosResponse } from "axios";
import { ILoginResponse } from "../types/authTypes";
import { authInstance } from "./axiosInstance";
import { IPatientForm } from '../types/patientsTypes';


const formatRequestBody = (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };
  return params;
};

const formatRequestBodyApiKey = (password: string, api_key: string) => {
  const params = {
    password: password,
    api_key: api_key,
  };
  return params;
};

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

export const authApi = {

  login: async (email: string, password: string): Promise<ILoginResponse> => {
    try {
      const response = await authInstance
      .post('api/auth/sign_in', formatRequestBody(email, password))
       console.log("POST [/auth/sign_in] response received successfully");
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST [api/auth/sign_in] error message: ${error.message}`);
      throw error.message;
    }
  },

  setPassword: async (password: string, api_key: string ): Promise<void> => {
    try {
      const response = await authInstance
      .post('api/auth/sign_up', formatRequestBodyApiKey(password, api_key))
        console.log(`POST [api/sing_up/${api_key}] response received successfully`);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST [api/sing_up/${api_key}] error message: ${error.message}`);
      throw error.message;
    }
  },

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
      console.log("error.response.data);", error.response.data);
      throw error.message;
    }
  },
};
