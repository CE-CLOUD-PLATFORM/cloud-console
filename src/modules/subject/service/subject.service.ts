import { axiosInstance } from '@/shared/utils';
import type { ISubjectsRes } from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';
import { getCookie } from 'cookies-next';

type Params = {
  queryKey: string[];
};

export const getSubjects = async ({
  queryKey,
}: Params): Promise<ISubjectsRes> => {
  const [_, user_id] = queryKey;
  const response = await axiosInstance.get<ISubjectsRes>(
    `${endpoints.subject.getAll}/?user_id=${user_id}`,
    {
      headers: {
        'X-Auth-Token': getCookie('token'),
      },
    },
  );
  return response.data;
};
