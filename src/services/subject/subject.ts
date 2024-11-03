import { ISubjectRes, ISubjectsRes, NewSubjectInputs, SubjectReqParam } from "@/interfaces/subject";
import useAxios from "../API";
import { Options } from "axios-hooks";
const path = {
  base:"/subject",
  get: {
    url: "/subject/",
    method: "GET",
  },
};

export const useQuerySubject = (params:SubjectReqParam, option?: Options) => {
  return useAxios<ISubjectRes>({
    url: path.get.url+`${params.subject_id}`,
    method: path.get.method,
  }, option);
};
export const usePostSubject = (data?: NewSubjectInputs, option?: Options) => {
  return useAxios({
    url: path.base,
    method: "POST",
    data
  }, option);
};