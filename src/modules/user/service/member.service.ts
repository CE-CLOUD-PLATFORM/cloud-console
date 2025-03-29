/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import type { IDomainUsersReqParam, IDomainUsersRes } from '../types/user';

type Params = {
  queryKey: string[];
};

export const postSubjectMember = async ({
  queryKey,
}: Params): Promise<IDomainUsersRes> => {
  const [_, domain_id] = queryKey;

  const params: IDomainUsersReqParam = {
    domain_id,
  };
  const response = await axiosInstance.get<
    IDomainUsersRes,
    any,
    IDomainUsersReqParam
  >(`${endpoints.domain.users}`, { params });
  return response.data;
};
