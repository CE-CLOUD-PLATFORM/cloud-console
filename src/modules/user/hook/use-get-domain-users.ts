import { useQuery } from '@tanstack/react-query';
import type { IDomainUsersReqParam } from '../types/user';
import { getDomainUsers } from '../service';

export const useGetDomainUsers = ({ domain_id }: IDomainUsersReqParam) =>
  useQuery({
    queryKey: ['domain-users', domain_id],
    queryFn: getDomainUsers,
    enabled: !!domain_id
  });
