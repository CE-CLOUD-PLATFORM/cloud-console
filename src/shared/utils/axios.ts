import { CONFIG } from "@/global-config";
import axios from "axios";
import { getCookie } from 'cookies-next';

export const axiosInstance = axios.create({
  baseURL: CONFIG.site.apiUrl,
  headers: {
    "X-Auth-Token": getCookie("token"),
  },
});

axiosInstance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);
