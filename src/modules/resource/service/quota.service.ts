/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import type { IQuotaCreate, IQuotaResponse, QuotaStatus } from '../types/quota';
import type { QueryParams } from '@/shared/interfaces/api';



export const getQuotas = async ({ queryKey }: QueryParams): Promise<IQuotaResponse> => {
  const [_, user_id,domain_id] = queryKey

  return (await axiosInstance.get<IQuotaResponse>(`${endpoints.resource.quotaAll}`, {
    params: {
      user_id,
      domain_id
    }
  })).data
}

export const getUserQuotas = async ({ queryKey }: QueryParams): Promise<IQuotaResponse> => {
  const [_, user_id] = queryKey
  return (await axiosInstance.get<IQuotaResponse>(`${endpoints.resource.quota}/${user_id}`,)).data
}
export const postQuota = async (data: IQuotaCreate) => {
  return (await axiosInstance.post<
    any,
    any,
    IQuotaCreate
  >(`${endpoints.resource.quota}`, data)).data
}

export const patchQuotaApproval = async (params: {
  quota_id: string, status: QuotaStatus
}) => {
  return (await axiosInstance.patch(`${endpoints.resource.quota}`, {}, {
    params
  })).data
}