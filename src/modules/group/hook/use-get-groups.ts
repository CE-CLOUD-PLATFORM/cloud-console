import { useQuery } from '@tanstack/react-query';
import { IGroupsReqParams } from '../types/group';
import { getGroups } from '../service';


// type Props = {
//   user_id?: string;
// };

export const useGetGroups = ({ user_id, subject_id, domain_name }: IGroupsReqParams) =>
  useQuery({
    queryKey: ['groups', user_id, subject_id, domain_name],
    queryFn: getGroups,
    // enabled: !!user_id,
  });

