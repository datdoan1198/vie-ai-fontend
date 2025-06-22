import axios from "axios";
import { getAuthToken } from "@/utils/localStorage.js";

const baseUrl = import.meta.env.VITE_API_URL;
const token = getAuthToken();

export const apiAxios = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

apiAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
