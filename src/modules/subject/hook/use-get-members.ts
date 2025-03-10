import { useQuery } from '@tanstack/react-query';
import { getSubjectMembers } from '../../subject/service';
import { IMemberReqParams } from '@/modules/user/types/user';

export const useGetSubjectMembers = ({ subject_id }: IMemberReqParams) =>
  useQuery({
    queryKey: ['subject-members', subject_id],
    queryFn: getSubjectMembers,
    enabled: !!subject_id,
    staleTime: 1000 * 60 * 3
  });
