import { axiosInstance } from '@/shared/utils';
import type {
  ISubjectsRes,
  ISubjectsReqParam,
} from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';
import { InstanceRes, InstancesQueryParams } from '../types/instance';

type Params = {
  queryKey: string[];
};

export const getInstances = async ({
  queryKey,
}: Params): Promise<InstanceRes> => {
  const [_, subject_id] = queryKey;

  const params: InstancesQueryParams = {
    subject_id,
  };
  const response = await axiosInstance.get<
    InstanceRes,
    any,
    InstancesQueryParams
  >(`${endpoints.instance.list}`, { params });
  return response.data;
};