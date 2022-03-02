import axios, { AxiosInstance } from "axios";
import domain from "./domain.json";

export const instance = (
  query: string = "",
  pageNumber: number = 0
): AxiosInstance => {
  const token = localStorage.getItem("token") ?? "";
  let cancel;
  // console.log("token", token)
  return axios.create({
    baseURL: domain.REACT_DOMAIN,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
    },
    params: {
      q: query,
      page: pageNumber,
    },
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  });
};

export const authInstance: AxiosInstance = axios.create({
  baseURL: domain.REACT_DOMAIN,
  headers: {
    "Content-Type": "multipart/form-data",
    // 'Access-Control-Allow-Origin' : '*',
  },
});
