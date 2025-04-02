import { CONFIG } from "@/global-config";
import axios from "axios";
import { getCookie } from 'cookies-next';

export const axiosInstance = axios.create({
  baseURL: CONFIG.site.apiUrl,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = getCookie("token");
    if (token) {
      request.headers["X-Auth-Token"] = token;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);
