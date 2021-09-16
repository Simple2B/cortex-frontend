import axios, { AxiosInstance } from "axios";
import domain from "./domain.json";

const token = localStorage.getItem("token") ?? "";
export const instance: AxiosInstance = axios.create({
  baseURL: domain.REACT_DOMAIN,
  headers: { Authorization: `Bearer ${token}` },
});
export const authInstance: AxiosInstance = axios.create({
  baseURL: domain.REACT_DOMAIN,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
