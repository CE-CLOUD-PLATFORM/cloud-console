import { useQuery } from '@tanstack/react-query';
import { getSubjects } from '../service';
import type { ISubjectsReqParam } from '../types/subject';

export const useGetSubjects = ({ user_id }: ISubjectsReqParam) =>
  useQuery({
    queryKey: user_id ? ['subjects', user_id] : ['subjects'],
    queryFn: getSubjects,
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5
  });

