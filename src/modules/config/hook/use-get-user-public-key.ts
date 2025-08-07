import { useQuery } from '@tanstack/react-query';
import { getUserPublicKeys } from '../service';
import type { PublicKeyReqParams } from '../types/public-key';

/**
 * Hook for fetching user's public keys
 * @param params - Parameters containing user_id
 * @returns Query result with user's public keys
 */
export const useGetUserPublicKeys = ({ user_id }: PublicKeyReqParams) =>
  useQuery({
    queryKey: ['user-public-key', user_id],
    queryFn: getUserPublicKeys,
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

