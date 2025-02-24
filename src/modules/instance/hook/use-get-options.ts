import { useQuery } from '@tanstack/react-query';
import { InstanceOptionQueryParam } from '../types/instance';
import { getInstanceOptions } from '../service';

export const useGetInstanceOption = (params: InstanceOptionQueryParam) => {
    const { subject_id } = params
    return useQuery({
        queryKey: ['instance-option', subject_id],
        queryFn: getInstanceOptions,
        enabled: !!subject_id,
        staleTime: 1000 * 60 * 5
    });
}

