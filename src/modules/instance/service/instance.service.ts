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

export const getInstances = async ({
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