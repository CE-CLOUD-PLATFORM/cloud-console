/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { QueryParams } from './../../../shared/interfaces/api';
import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import type { IRecoveryPassword } from '../types/account';
import type { IResponse } from '@/shared/interfaces/api';
import type {
  IAuthLogin,
  IAuthLoginRes,
  IAuthValidateToken,
} from '../types/auth';

export const authUser = async (data: IAuthLogin): Promise<IAuthLoginRes> => {
  const response = await axiosInstance.post<IAuthLoginRes>(
    endpoints.auth.login,
    data,
    {
      timeout: 5000,
    },
  );
  return response.data;
};

export const recoveryPassword = async (data: IRecoveryPassword) => {
  const response = await axiosInstance.post(endpoints.auth.recoveryPass, data);
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
        params,
      },
    );
    return response.status;
  } catch (error) {
    console.log(error);
    return 401;
  }
};
