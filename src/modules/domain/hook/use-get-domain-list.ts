import { useQuery } from '@tanstack/react-query';
import { getDomainList } from '../service/domain.service';


export const useGetDomainList = () =>
  useQuery({
    queryKey: ['domains'],
    queryFn: getDomainList,
  });
