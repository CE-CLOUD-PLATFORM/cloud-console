import { axiosInstance } from '@/shared/utils';

import { endpoints } from '@/shared/configs';
import { getCookie } from 'cookies-next';
import {  IGroupsReqParams, IGroupsRes } from '../types/group';

type Params = {
  queryKey: string[];
};

export const getGroups = async ({
  queryKey,
}: Params): Promise<IGroupsRes> => {
  const [_, user_id, subject_id, domain_name] = queryKey;

  let params: IGroupsReqParams = {
    user_id,
    subject_id,
    domain_name,
  }
  const response = await axiosInstance.get<IGroupsRes>(
    `${endpoints.group.getAll}`, 
    {
    params
  }
  );
  return response.data;
};


// export const getGroup = async ({
//   queryKey,
// }: Params): Promise<IGroupsRes> => {
//   const [_, user_id, subject_id, domain_name] = queryKey;

//   let params: IGroupsReq = {
//     user_id,
//     subject_id,
//     domain_name,
//   }
//   const response = await axiosInstance.get<IGroupsRes>(
//     `${endpoints.group.getAll}`, {
//     params
//   }
//   );
//   return response.data;
// };
