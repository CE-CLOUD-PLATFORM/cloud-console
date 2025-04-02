/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import type { IGroupCreate, IGroupDelete, IGroupsReqParams, IGroupsRes } from '../types/group';
import type { IResponse } from '@/shared/interfaces/api';

type Params = {
  queryKey: string[];
};

export const getGroups = async ({ queryKey }: Params): Promise<IGroupsRes> => {
  const [_, user_id, subject_id] = queryKey;

  const params: IGroupsReqParams = {
    user_id,
    subject_id,
  };
  const response = await axiosInstance.get<IGroupsRes>(
    `${endpoints.group.getAll}`,
    {
      params,
    },
  );
  return response.data;
};

export const postGroup = async (data: IGroupCreate): Promise<IResponse> => {
  const response = await axiosInstance.post(
    `${endpoints.group.post}`, data
  );
  return response.data;
};
export const deleteGroup = async (data: IGroupDelete): Promise<IResponse> => {
  const response = await axiosInstance.delete<any, any, IGroupDelete>(
    `${endpoints.group.post}`, {
    params: data

  }
  );
  return response.data;
};
