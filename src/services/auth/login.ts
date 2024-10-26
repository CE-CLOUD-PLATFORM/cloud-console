import { Options } from "axios-hooks";
import useAxios from "../API";
import { ILoginReq, ILoginRes } from "@/interfaces/auth";
const path = {
  login: {
    url: "/auth/login",
    method: "POST",
  },
  logout: {
    url: "/auth/logout",
    method: "POST",
  },
};

export const useLogin = (option?:Options) => {
  return useAxios<ILoginRes,ILoginReq>({ url: path.login.url, method: path.login.method },option);
};
