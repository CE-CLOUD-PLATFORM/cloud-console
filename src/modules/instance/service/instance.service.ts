
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import type {
  InstanceCreate,
  InstanceDelete,
  InstanceExternalAccessParams,
  InstanceMakeInternalParams,
  InstanceOptionQueryParam,
  InstanceOptionRes,
  InstanceQueryParams,
  InstanceRebootParams,
  InstanceRes,
  InstancesQueryParams,
  InstancesRes,
  InstanceStartParams,
  InstanceStopParams,
  InstanceVNCRes,
} from '../types/instance';

type Params = {
  queryKey: string[];
};
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
export const getInstance = async ({
  queryKey,
}: Params): Promise<InstanceRes> => {
  const [_, subject_id, instance_id] = queryKey;

  const params: InstanceQueryParams = {
    subject_id,
    instance_id,
  };
  const response = await axiosInstance.get<
    InstanceRes,
    any,
    InstanceQueryParams
  >(`${endpoints.instance.index}`, { params });
  return response.data;
};
export const getInstanceOptions = async ({
  queryKey,
}: Params): Promise<InstanceOptionRes> => {
  const [_, subject_id] = queryKey;

  const params: InstanceOptionQueryParam = {
    subject_id,
  };
  const response = await axiosInstance.get(`${endpoints.instance.option}`, {
    params,
  });
  return response.data;
};

export const postInstance = async (data: InstanceCreate) => {
  return (
    await axiosInstance.post<any, any, InstanceCreate>(
      `${endpoints.instance.index}`,
      data,
    )
  ).data;
};
export const deleteInstance = async (params: InstanceDelete) => {
  return (
    await axiosInstance.delete<any, any, InstanceDelete>(
      `${endpoints.instance.index}`,
      {
        params,
      },
    )
  ).data;
};

export const getInstanceVNC = async ({
  queryKey,
}: Params): Promise<InstanceVNCRes> => {
  const [_, subject_id, instance_id] = queryKey;

  const params: InstanceQueryParams = {
    subject_id,
    instance_id,
  };
  const response = await axiosInstance.get<
    InstanceRes,
    any,
    InstanceQueryParams
  >(`${endpoints.instance.vnc}`, { params });
  return response.data;
};

export const postExternalAccess = async (data: InstanceExternalAccessParams) => {
  return (
    await axiosInstance.post<any, any, InstanceExternalAccessParams>(
      `${endpoints.instance.external}`,
      data,
    )
  ).data;
};

export const deleteMakeInternal = async (params: InstanceMakeInternalParams) => {
  return (
    await axiosInstance.delete<any, any, InstanceMakeInternalParams>(
      `${endpoints.instance.external}`,
      {
        params,
      },
    )
  ).data;
};

export const postInstanceStart = async (params: InstanceStartParams) => {
  return (
    await axiosInstance.post(
      `${endpoints.instance.start}`, null,
      { params },
    )
  ).data;
};
export const postInstanceStop = async (params: InstanceStopParams) => {
  return (
    await axiosInstance.post(
      `${endpoints.instance.stop}`, null,
      { params },
    )
  ).data;
};
export const postInstanceReboot = async (params: InstanceRebootParams) => {
  return (
    await axiosInstance.post(
      `${endpoints.instance.reboot}`, null,
      { params },
    )
  ).data;
};