import { axiosInstance } from '@/shared/utils';
import type {
  ISubjectRes,
  ISubjectsRes,
  ISubjectsReqParam,
  ISubjectReqParam,
  ISubjectCreate,
} from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';

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
  const [_, subject_id, domain_name] = queryKey;

  const params: ISubjectReqParam = {
    subject_id,
    domain_name,
  };
  const response = await axiosInstance.get<ISubjectRes>(
    `${endpoints.subject.get}`,
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