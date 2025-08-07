/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';


import { endpoints } from '@/shared/configs';
import type { PublicKeyReq, PublicKeyReqParams, PublicKeyRes } from '../types/public-key';
import type { IResponse } from '@/shared/interfaces/api';

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
export const postUserPublicKey = async (data: PublicKeyReq): Promise<PublicKeyRes> => {

  const response = await axiosInstance.post<
    IResponse,
    any,
    PublicKeyReq
  >(`${endpoints.config.publicKey}`, data);
  return response.data;
};
export const deleteUserPublicKey = async (id: string) => {

  const response = await axiosInstance.delete(`${endpoints.config.publicKey}`,{
    params: { id }
  });
  return response.data;
};