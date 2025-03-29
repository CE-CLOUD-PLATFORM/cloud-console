import { useQuery } from '@tanstack/react-query';
import { getRoles } from '../service';

export const useGetRoles = () =>
    useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
    });
