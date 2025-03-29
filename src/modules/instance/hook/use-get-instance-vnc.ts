import { useQuery } from '@tanstack/react-query';
import { getInstance, getInstanceVNC } from '../service';
import { InstanceQueryParams } from '../types/instance';

export const useGetInstanceVNC = (params: InstanceQueryParams) => {
    const { subject_id, instance_id } = params
    return useQuery({
        queryKey: ['instance-vnc', subject_id, instance_id],
        queryFn: getInstanceVNC,
        enabled: false,
    });
}

