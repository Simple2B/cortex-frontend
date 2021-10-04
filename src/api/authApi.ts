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
  login: async (email: string, password: string) => {
    const response = await authInstance
      .post('api/auth/sign_in', formatRequestBody(email, password))
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log("POST [/auth/sign_in] response received successfully");
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/auth/sign_in] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },

  setPassword: async (password: string, api_key: string ) => {
    const response = await authInstance
      .post('api/auth/sign_up', formatRequestBodyApiKey(password, api_key))
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log(`POST [api/sing_up/${api_key}] response received successfully`);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/sing_up/${api_key}] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },

  registrationClient: async (data: DataClient ) => {
    const response = await authInstance
      .post('api/client/registration', data)
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log(`POST [api/client/registration/${data}] response received successfully`);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/client/registration/${data}] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },
};
