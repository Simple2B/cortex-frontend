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
  conditions: Set<string>,
  otherCondition: string,
  diseases: Set<string>,
  medications: string,
  covidTestedPositive: boolean | null,
  covidVaccine: boolean | null,
  stressfulLevel: string,
  relationshipChild: string,
}

const formatRequestData = (modifyDataForBackend: Partial<IPatientForm>) => {
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
    conditions: modifyDataForBackend.conditions,
    otherCondition: modifyDataForBackend.otherCondition,
    diseases: modifyDataForBackend.diseases,
    medications: modifyDataForBackend.medications,
    covidTestedPositive: modifyDataForBackend.covidTestedPositive,
    covidVaccine: modifyDataForBackend.covidVaccine,
    stressfulLevel: modifyDataForBackend.stressfulLevel,
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

  registrationClient: async (data: Partial<IPatientForm>): Promise<void> => {

    console.log('dataReqPatient =>', data);
    const modifyDataForBackend: Partial<IPatientForm>  = {...data, otherCondition: data.checkedOtherCondition ? data.otherCondition : "", relationshipChild: data.consentMinorChild ? data.relationshipChild : ""};
    delete modifyDataForBackend["conditionError"];
    delete modifyDataForBackend["checkedOtherCondition"];
    delete modifyDataForBackend["diseaseError"];
    delete modifyDataForBackend["consentMinorChild"];

    console.log("modifyDataForBackend", modifyDataForBackend);

    try {
      const response = await authInstance
      .post('api/client/registration', formatRequestData(modifyDataForBackend))
      console.log(`POST [api/client/registration/${modifyDataForBackend}] response received successfully`);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST [api/client/registration/${modifyDataForBackend}] error message: ${error.message}`);
      throw error.message;
    }
  },
};
