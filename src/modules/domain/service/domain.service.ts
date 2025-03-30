/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import { DomainListRes } from '../types/domain';

type Params = {
  queryKey: string[];
};

export const getDomainList = async (): Promise<DomainListRes> => {

  const response = await axiosInstance.get<DomainListRes>(`${endpoints.domain.list}`);
  return response.data;
};
