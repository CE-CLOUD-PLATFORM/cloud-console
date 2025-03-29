/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/shared/utils';
import type {
  ISubjectRes,
  ISubjectsRes,
  ISubjectsReqParam,
  ISubjectReqParam,
  ISubjectCreate,
} from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';
import type { IMemberReqParams, IMemberRes } from '@/modules/user/types/member';

type Params = {
  queryKey: string[];
};

export const getSubjects = async ({
  queryKey,
}: Params): Promise<ISubjectsRes> => {
  const [_, user_id] = queryKey;

  const params: ISubjectsReqParam = {
    user_id,
  };
  const response = await axiosInstance.get<
    ISubjectsRes,
    any,
    ISubjectsReqParam
  >(`${endpoints.subject.getAll}`, { params });
  return response.data;
};

export const getSubject = async ({
  queryKey,
}: Params): Promise<ISubjectRes> => {
  const [_, subject_id, domain_name, user_id] = queryKey;

  const params: ISubjectReqParam = {
    subject_id,
    domain_name,
    user_id
  };
  const response = await axiosInstance.get<ISubjectRes>(
    `${endpoints.subject.get}`,
    { params },
  );
  return response.data;
};
export const getSubjectMembers = async ({
  queryKey,
}: Params): Promise<IMemberRes> => {
  const [_, subject_id] = queryKey;

  const params: IMemberReqParams = {
    subject_id,
  };
  const response = await axiosInstance.get<IMemberRes>(
    `${endpoints.subject.listMember}`,
    { params },
  );
  return response.data;
};
export const postSubject = async (data: ISubjectCreate) => {
  return (await axiosInstance.post<
    any,
    any,
    ISubjectCreate
  >(`${endpoints.subject.create}`, data)).data
}

export const deleteSubject = async (id: string) => {
  return (await axiosInstance.delete(`${endpoints.subject.create}`, {
    params: id
  })).data
}