import { tokens } from './../../../shared/locales/tokens';
import { QueryParams } from './../../../shared/interfaces/api';
import { Post } from './../../../shared/types/social';
import { axiosInstance } from "@/shared/utils";

import { endpoints } from "@/shared/configs";
import { IRecoveryPassword } from "../types/account";
import { IResponse } from '@/shared/interfaces/api';
import { IAuthLogin, IAuthLoginRes, IAuthValidateToken } from '../types/auth';

export const authUser = async (data: IAuthLogin): Promise<IAuthLoginRes> => {
  const response = await axiosInstance.post<IAuthLoginRes>(
    endpoints.auth.login,
    data, {
    timeout: 5000
  }
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

export const validateToken = async ({ queryKey }: QueryParams) => {

  const [_, token] = queryKey;

  const params: IAuthValidateToken = {
    token,
  };
  try {
    const response = await axiosInstance.get<IResponse>(
      endpoints.auth.validate,
      {
        params
      }
    );
    return response.status;

  } catch (error) {
    return 401

  }


};