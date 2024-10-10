import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  }),
});

export default useAxios;
