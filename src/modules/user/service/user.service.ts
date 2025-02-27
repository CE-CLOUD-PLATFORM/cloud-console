import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import { IDomainUsersReqParam, IDomainUsersRes } from '../types/user';

type Params = {
  queryKey: string[];
};

export const getDomainUsers = async ({
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
