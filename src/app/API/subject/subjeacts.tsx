import { ISubjectsRes } from "@/interfaces/subject";
import useAxios from "../API";
const path = {
  login: {
    url: "/api/v1/subjects/",
    method: "GET",
  },
};

export const useQuerySubjects = (token: string) => {
  return useAxios<ISubjectsRes>({
    url: path.login.url,
    method: path.login.method,
    headers: {
      "X-Auth-Token": token,
    },
  });
};
