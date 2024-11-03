import { IGroupList } from "@/interfaces/group";
import useAxios from "@/services/API";
import { Options } from "axios-hooks";
const path = {
  login: {
    url: "/subject/groups",
    method: "GET",
  },
};

export const useQueryGroups = (project_id: string, option?: Options) => {
  return useAxios<IGroupList>(
    {
      url: path.login.url + `/${project_id}`,
      method: path.login.method,
    },
    option
  );
};
