import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import { IQuotaCreate } from '../types/quota';

type Params = {
  queryKey: string[];
};


export const postSubject = async (data: IQuotaCreate) => {
  return (await axiosInstance.post<
    any,
    any,
    IQuotaCreate
  >(`${endpoints.subject.create}`, data)).data
}

