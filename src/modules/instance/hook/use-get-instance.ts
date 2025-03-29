import { useQuery } from '@tanstack/react-query';
import { getInstance } from '../service';
import { InstanceQueryParams } from '../types/instance';

export const useGetInstance = (params: InstanceQueryParams) => {
    const { subject_id, instance_id } = params
    return useQuery({
        queryKey: ['instance', subject_id, instance_id],
        queryFn: getInstance,
        enabled: !!subject_id && !!instance_id,
        refetchInterval: 1000 * 45,
    });
}

