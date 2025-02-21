import { useQuery } from '@tanstack/react-query';
import { getSubject, getSubjects } from '../service';
import { ISubjectReqParam } from '../types/subject';

export const useGetSubject = ({ subject_id, domain_name }: ISubjectReqParam) =>
  useQuery({
    queryKey: ['subject', subject_id, domain_name],
    queryFn: getSubject,
    enabled: !!subject_id,
    staleTime: 1000 * 60 * 3
  });
