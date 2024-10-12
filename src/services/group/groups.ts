
import { IGroupList } from "@/interfaces/group";
import useAxios from "../API";
import { Options } from "axios-hooks";
const path = {
  login: {
    url: "/api/v1/subject/groups",
    method: "GET",
  },
};

export const useQueryGroups = (project_id: string,option?:Options) => {
  return useAxios<IGroupList>({
    url: path.login.url+`/${project_id}`,
    method: path.login.method,
  },option);
};
