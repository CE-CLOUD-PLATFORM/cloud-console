// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { PublicKeyParams, PublicKeyReq, PublicKeyRes } from "@/interfaces/keys";

// const path = {
//   base: "/config/public-key",
// };

// // Fetch public keys
// const fetchPublicKeys = async (params: PublicKeyParams): Promise<PublicKeyRes> => {
//   const response = await axios.get(path.base, { params });
//   return response.data;
// };

// export const useQueryPublicKeys = (params: PublicKeyParams) => {
//   return useQuery<PublicKeyRes, Error>(["publicKeys", params], () => fetchPublicKeys(params));
// };

// // Post public key
// const postPublicKey = async (data: PublicKeyReq): Promise<unknown> => {
//   const response = await axios.post(path.base, data);
//   return response.data;
// };

// export const usePostPublicKey = () => {
//   return useMutation<unknown, Error, PublicKeyReq>(postPublicKey);
// };
