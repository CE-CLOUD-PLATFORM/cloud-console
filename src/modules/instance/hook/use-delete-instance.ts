/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { InstanceDelete } from '../types/instance';
import { deleteInstance } from '../service';
import type { AxiosError } from 'axios';

export const useDeleteInstance = (options?: MutationOptions<any, AxiosError, InstanceDelete, unknown>) => {
    return useMutation({
        mutationFn: deleteInstance,
        ...options
    });
}

