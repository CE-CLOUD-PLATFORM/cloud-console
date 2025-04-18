import { useQuery } from '@tanstack/react-query';
import { getSubject } from '../../subject/service';
import type { ISubjectReqParam } from '../../subject/types/subject';

export const useGetSubject = ({ subject_id, domain_name, user_id }: ISubjectReqParam) =>
  useQuery({
    queryKey: ['subject', subject_id, domain_name, user_id],
    queryFn: getSubject,
    enabled: !!subject_id && !!user_id,
    staleTime: 1000 * 60 * 3
  });
