import { CONFIG } from "@/global-config";
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: CONFIG.site.apiUrl });

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
