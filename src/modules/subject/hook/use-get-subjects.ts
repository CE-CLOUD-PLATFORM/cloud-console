import { useQuery } from '@tanstack/react-query';
import { getSubject, getSubjects } from '../service';
import { ISubjectsReqParam } from '../types/subject';

export const useGetSubjects = ({ user_id }: ISubjectsReqParam) =>
  useQuery({
    queryKey: user_id ? ['subjects', user_id] : ['subjects'],
    queryFn: getSubjects,
    enabled: !!user_id,
  });

