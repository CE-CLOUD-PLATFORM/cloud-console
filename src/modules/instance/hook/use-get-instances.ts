import { useQuery } from '@tanstack/react-query';
import { InstancesQueryParams } from '../types/instance';
import { getInstances } from '../service';

export const useGetInstances = (params: InstancesQueryParams) => {
    const { subject_id } = params
    return useQuery({
        queryKey: ['instances', subject_id],
        queryFn: getInstances,
        enabled: !!subject_id,
        staleTime: 1000 * 60 * 5
    });
}

