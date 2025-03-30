import { useQuery } from '@tanstack/react-query';
import { getQuotas } from '../service';

export const useGetQuotas = ({ user_id }: { user_id: string }) =>
    useQuery({
        queryKey: ['quotas', user_id],
        queryFn: getQuotas,
        staleTime: 1000 * 60 * 3,
    });
