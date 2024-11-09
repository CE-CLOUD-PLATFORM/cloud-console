import { axiosInstance } from '@/shared/utils';
import type { ISubjectRes, ISubjectsRes, ISubjectsReqParam, ISubjectReqParam } from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';

type Params = {
  queryKey: string[];
};

// recommend inline type definitions of queryKey, many service many xxxParams ,it make to confuse 
export const getSubjects = async ({
  queryKey,
}: Params): Promise<ISubjectsRes> => {
  const [_, user_id] = queryKey;
  // const response = await axiosInstance.get<ISubjectsRes>(
  //   `${endpoints.subject.getAll}/?user_id=${user_id}`,
  // );
  let params: ISubjectsReqParam = {
    user_id,
  }
  const response = await axiosInstance.get<ISubjectsRes, any, ISubjectsReqParam>(
    `${endpoints.subject.getAll}`,
    { params }
  );
  return response.data;
};



export const getSubject = async ({
  queryKey,
}: Params): Promise<ISubjectRes> => {
  const [_, subject_id, domain_name] = queryKey;

  let params: ISubjectReqParam = {
    subject_id,
    domain_name,
  }
  // const response = await axiosInstance.get<ISubjectRes,any,ISubjectReqParam>(
  //   `${endpoints.subject.get}`,
  //   { params }
  // );
  // ท่านี้ควรจะเวิร์ค แต่มันไม่ detect param ตอนส่งผิด เลย validate ตอนสร้างตัวแปร params เอา
  const response = await axiosInstance.get<ISubjectRes>(
    `${endpoints.subject.get}`,
    { params }
  );
  return response.data;
};

