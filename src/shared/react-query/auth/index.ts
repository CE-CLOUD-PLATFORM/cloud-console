// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { ILoginReq, ILoginRes } from "@/interfaces/auth";

// const path = {
//   login: {
//     url: "/auth/login",
//     method: "POST",
//   },
//   logout: {
//     url: "/auth/logout",
//     method: "POST",
//   },
// };

// const login = async (data: ILoginReq): Promise<ILoginRes> => {
//   const response = await axios.post(path.login.url, data);
//   return response.data;
// };

// export const useLogin = () => {
//   return useMutation<ILoginRes, Error, ILoginReq>(login);
// };