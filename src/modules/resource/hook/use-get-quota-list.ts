import { useQuery } from '@tanstack/react-query';
import { getQuotas } from '../service';

export const useGetQuotas = () =>
    useQuery({
        queryKey: ['quotas'],
        queryFn: getQuotas,
        staleTime: 1000 * 60 * 3,
    });
