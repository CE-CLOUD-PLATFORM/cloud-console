
import { IGroupList } from "@/interfaces/group";
import useAxios from "../API";
const path = {
  login: {
    url: "/api/v1/subject/groups",
    method: "GET",
  },
};

export const useQuerySubjects = (project_id: string,token :string) => {
  return useAxios<IGroupList>({
    url: path.login.url+`/${project_id}`,
    method: path.login.method,
    headers: {
      "X-Auth-Token": token,
    },
  });
};
