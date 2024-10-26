import { ISubjectsRes, SubjectListReqParam } from "@/interfaces/subject";
import useAxios from "../API";
import { Options } from "axios-hooks";
const path = {
  login: {
    url: "/subjects/",
    method: "GET",
  },
};

export const useQuerySubjects = (params:SubjectListReqParam,option?: Options) => {
  return useAxios<ISubjectsRes>({
    url: path.login.url,
    method: path.login.method,
    params
  }, option);
};
