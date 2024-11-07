// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   InstanceOptionRes,
//   InstanceQueryOptionParam,
//   InstanceQueryParam,
//   InstanceReq,
//   InstanceRes,
// } from "@/interfaces/Instance";

// const path = {
//   base: "/server",
//   option: "/options",
// };

// // Fetch instance data
// const fetchInstance = async (params: InstanceQueryParam): Promise<InstanceRes> => {
//   const response = await axios.get(path.base, { params });
//   return response.data;
// };

// export const useQueryInstance = (params: InstanceQueryParam) => {
//   return useQuery<InstanceRes, Error>(["instance", params], () => fetchInstance(params));
// };

// // Fetch instance options
// const fetchInstanceOption = async (params: InstanceQueryOptionParam): Promise<InstanceOptionRes> => {
//   const response = await axios.get(`${path.base}${path.option}`, { params });
//   return response.data;
// };

// export const useQueryInstanceOption = (params: InstanceQueryOptionParam) => {
//   return useQuery<InstanceOptionRes, Error>(["instanceOption", params], () => fetchInstanceOption(params));
// };

// // Post instance data
// const postInstance = async (data: InstanceReq): Promise<unknown> => {
//   const response = await axios.post(path.base, data);
//   return response.data;
// };

// export const usePostInstance = () => {
//   return useMutation<unknown, Error, InstanceReq>(postInstance);
// };
