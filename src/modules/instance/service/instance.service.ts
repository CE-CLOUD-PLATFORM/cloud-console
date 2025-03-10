import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import { InstanceCreate, InstanceOptionQueryParam, InstanceOptionRes, InstancesQueryParams, InstancesRes } from '../types/instance';

type Params = {
  queryKey: string[];
};
2
export const getInstances = async ({
  queryKey,
}: Params): Promise<InstancesRes> => {
  const [_, subject_id] = queryKey;

  const params: InstancesQueryParams = {
    subject_id,
  };
  const response = await axiosInstance.get<
    InstancesRes,
    any,
    InstancesQueryParams
  >(`${endpoints.instance.list}`, { params });
  return response.data;
};

export const getInstanceOptions = async ({
  queryKey,
}: Params): Promise<InstanceOptionRes> => {
  const [_, subject_id] = queryKey;

  const params: InstanceOptionQueryParam = {
    subject_id,
  };
  const response = await axiosInstance.get(`${endpoints.instance.option}`, { params });
  return response.data;
};

export const postInstance = async (data: InstanceCreate) => {
  return (await axiosInstance.post<
    any,
    any,
    InstanceCreate
  >(`${endpoints.instance.post}`, data)).data
}