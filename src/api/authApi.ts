import { AxiosError, AxiosResponse } from "axios";
import { ILoginResponse } from "../types/authTypes";
import { authInstance } from "./axiosInstance";

const formatRequestBody = (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };
  return params;
};

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await authInstance
      .post("/auth/sign_in", formatRequestBody(email, password))
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log("POST [/auth/sign_in] response received successfully");
        console.log(res);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [/auth/sign_in] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },
};
