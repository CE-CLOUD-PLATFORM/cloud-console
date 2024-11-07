// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { IGroupList } from "@/interfaces/group";

// const path = {
//   groups: {
//     url: "/subject/groups",
//     method: "GET",
//   },
// };

// const fetchGroups = async (project_id: string): Promise<IGroupList> => {
//   const response = await axios.get(`${path.groups.url}/${project_id}`);
//   return response.data;
// };

// export const useQueryGroups = (project_id: string) => {
//   return useQuery<IGroupList, Error>(["groups", project_id], () => fetchGroups(project_id));
// };
