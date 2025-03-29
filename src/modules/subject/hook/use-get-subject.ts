import { useQuery } from '@tanstack/react-query';
import { getSubject } from '../service';
import type { ISubjectReqParam } from '../types/subject';

export const useGetSubject = ({ subject_id, domain_name, user_id }: ISubjectReqParam) =>
  useQuery({
    queryKey: ['subject', subject_id, domain_name, user_id],
    queryFn: getSubject,
    enabled: !!subject_id && !!user_id,
    staleTime: 1000 * 60 * 3
  });
