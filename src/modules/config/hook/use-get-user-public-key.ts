import { useQuery } from '@tanstack/react-query';
import { PublicKeyReqParams } from '../types/public-key';
import { getUserPublicKeys } from '../service';




export const useGetUserPublicKeys = ({ user_id }: PublicKeyReqParams) =>
  useQuery({
    queryKey: ['user-public-key', user_id],
    queryFn: getUserPublicKeys,
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5
  });

