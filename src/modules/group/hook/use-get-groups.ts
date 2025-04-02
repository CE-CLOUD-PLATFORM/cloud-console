import { useQuery } from '@tanstack/react-query';
import type { IGroupsReqParams } from '../types/group';
import { getGroups } from '../service';


// type Props = {
//   user_id?: string;
// };

export const useGetGroups = ({ user_id, subject_id }: IGroupsReqParams) =>
  useQuery({
    queryKey: ['groups', user_id, subject_id],
    queryFn: getGroups,
    enabled: !!user_id && !!subject_id,
    staleTime: 1000 * 60 * 5
  });

