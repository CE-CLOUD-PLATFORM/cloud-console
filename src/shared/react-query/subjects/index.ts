// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { ISubjectsRes, SubjectListReqParam } from "@/interfaces/Subject";

// const path = {
//   list: {
//     url: "/subjects/",
//     method: "GET",
//   },
// };

// // Fetch subjects list
// const fetchSubjects = async (params: SubjectListReqParam): Promise<ISubjectsRes> => {
//   const response = await axios.get(path.list.url, { params });
//   return response.data;
// };

// export const useQuerySubjects = (params: SubjectListReqParam) => {
//   return useQuery<ISubjectsRes, Error>(["subjects", params], () => fetchSubjects(params));
// };
