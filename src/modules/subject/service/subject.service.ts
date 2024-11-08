import { axiosInstance } from '@/shared/utils';
import type { ISubjectRes, ISubjectsRes } from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';
import { getCookie } from 'cookies-next';

type Params = {
  queryKey: string[];
};

// recommend inline type definitions of queryKey, many service many xxxParams ,it make to confuse 
export const getSubjects = async ({
  queryKey,
}: Params): Promise<ISubjectsRes> => {
  const [_, user_id] = queryKey;
  const response = await axiosInstance.get<ISubjectsRes>(
    `${endpoints.subject.getAll}/?user_id=${user_id}`,
  );
  return response.data;
};



export const getSubject = async ({
  queryKey,
}: Params): Promise<ISubjectRes> => {
  const [_, subject_id, domain_name] = queryKey;
  const response = await axiosInstance.get<ISubjectRes>(
    `${endpoints.subject.get}/?subject_id=${subject_id}&domain_name=${domain_name}`,
  );
  return response.data;
};

