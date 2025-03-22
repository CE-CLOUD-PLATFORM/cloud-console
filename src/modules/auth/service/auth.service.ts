import { Post } from './../../../shared/types/social';
import { axiosInstance } from "@/shared/utils";
import type { ILoginReq, ILoginRes } from "@/shared/interfaces/login";
import { endpoints } from "@/shared/configs";
import { IRecoveryPassword } from "../types/account";

export const authUser = async (data: ILoginReq): Promise<ILoginRes> => {
  const response = await axiosInstance.post<ILoginRes>(
    endpoints.auth.login,
    data
  );
  return response.data;
};

export const recoveryPassword = async (data: IRecoveryPassword) => {
  const response = await axiosInstance.post(
    endpoints.auth.recoveryPass,
    data
  );
  return response.data;
};