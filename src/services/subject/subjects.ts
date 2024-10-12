import { ISubjectsRes } from "@/interfaces/subject";
import useAxios from "../API";
import { Options } from "axios-hooks";
const path = {
  login: {
    url: "/api/v1/subjects/",
    method: "GET",
  },
};

export const useQuerySubjects = (option?: Options) => {
  return useAxios<ISubjectsRes>({
    url: path.login.url,
    method: path.login.method,
  }, option);
};
