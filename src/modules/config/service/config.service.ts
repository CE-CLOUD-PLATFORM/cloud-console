/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';


import { endpoints } from '@/shared/configs';
import type { PublicKeyReqParams, PublicKeyRes } from '../types/public-key';

type Params = {
  queryKey: string[];
};

export const getUserPublicKeys = async ({
  queryKey,
}: Params): Promise<PublicKeyRes> => {
  const [_, user_id] = queryKey;

  const params: PublicKeyReqParams = {
    user_id,
  };
  const response = await axiosInstance.get<
    PublicKeyRes,
    any,
    PublicKeyReqParams
  >(`${endpoints.config.publicKey}`, { params });
  return response.data;
};
