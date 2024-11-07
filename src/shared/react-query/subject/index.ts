// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { ISubjectRes, NewSubjectInputs, SubjectReqParam } from "@/interfaces/Subject";

// const path = {
//   base: "/subject",
//   get: {
//     url: "/subject/",
//     method: "GET",
//   },
// };

// // Fetch a specific subject
// const fetchSubject = async (params: SubjectReqParam): Promise<ISubjectRes> => {
//   const response = await axios.get(`${path.get.url}${params.subject_id}`);
//   return response.data;
// };

// export const useQuerySubject = (params: SubjectReqParam) => {
//   return useQuery<ISubjectRes, Error>(["subject", params.subject_id], () => fetchSubject(params));
// };

// // Post new subject
// const postSubject = async (data: NewSubjectInputs): Promise<unknown> => {
//   const response = await axios.post(path.base, data);
//   return response.data;
// };

// export const usePostSubject = () => {
//   return useMutation<unknown, Error, NewSubjectInputs>(postSubject);
// };
