/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  ISubjectCreate,
  ISubjectDelete,
  ISubjectReqParam,
  ISubjectRes,
  ISubjectsReqParam,
  ISubjectsRes,
} from '@/modules/subject/types/subject';
import type { IMemberReqParams, IMemberRes, IMemberSubjectAdd, IMemberSubjectAddRes } from '@/modules/user/types/member';
import { endpoints } from '@/shared/configs';
import { axiosInstance } from '@/shared/utils';

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

export const deleteSubject = async (data: ISubjectDelete) => {
  return (await axiosInstance.delete(`${endpoints.subject.index}`, {
    params: data.id
  })).data
}
export const postSubjectMember = async (data: IMemberSubjectAdd) => {
  return (await axiosInstance.post<
    IMemberSubjectAddRes,
    any,
    IMemberSubjectAdd
  >(`${endpoints.subject.addMembers}`, data)).data
}