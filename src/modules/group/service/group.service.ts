/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import type { IGroupCreate, IGroupsReqParams, IGroupsRes } from '../types/group';
import type { IResponse } from '@/shared/interfaces/api';

type Params = {
  queryKey: string[];
};

export const getGroups = async ({ queryKey }: Params): Promise<IGroupsRes> => {
  const [_, user_id, subject_id, domain_name] = queryKey;

  const params: IGroupsReqParams = {
    user_id,
    subject_id,
    domain_name,
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
