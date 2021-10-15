// import { AxiosError, AxiosResponse } from "axios";
import { ILoginResponse } from "../types/authTypes";
import { authInstance } from "./axiosInstance";


const formatRequestBody = (username: string, password: string) => {
  // const params = {
  //   username: username,
  //   password: password,
  // };
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return formData;
};

const formatRequestBodyApiKey = (password: string, api_key: string) => {
  const params = {
    password: password,
    api_key: api_key,
  };
  return params;
};

export const authApi = {

  login: async (username: string, password: string): Promise<ILoginResponse> => {
    try {
      const response = await authInstance
      .post('api/auth/sign_in', formatRequestBody(username, password))
       console.log("POST [/auth/sign_in] response received successfully");
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST [api/auth/sign_in] error message: ${error.message}`);
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  },
};
