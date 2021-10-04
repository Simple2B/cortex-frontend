import { AxiosError, AxiosResponse } from "axios";
import { ILoginResponse } from "../types/authTypes";
import { authInstance } from "./axiosInstance";


interface DataClient {
  firstName: string,
  lastName: string,
  dateBirth: Date,
  address: string,
  city: string,
  state: string,
  zip: string,
  phone: string,
  email: string,
  checkBoxesСonditions: {
    conditions: string,
    otherLabel: string,
  },
  checkboxesFollowing: string,
  medications: string,
  testedPositive: string,
  covidVaccine: string,
  stressfulLevel: string,
  consentMinorChild: string,
  relationshipChild: string,
};

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

  registrationClient: async (data: DataClient): Promise<void> => {
    try {
      const response = await authInstance
      .post('api/client/registration', data)
      console.log(`POST [api/client/registration/${data}] response received successfully`);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST [api/client/registration/${data}] error message: ${error.message}`);
      throw error.message;
    }
  },
};
