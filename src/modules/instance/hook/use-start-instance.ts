/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { postInstanceStart } from '../service';
import type { InstanceStartParams } from '../types/instance';

export const useStartInstance = (options?: MutationOptions<any, AxiosError, InstanceStartParams, unknown>) => {
    return useMutation({
        mutationFn: postInstanceStart,
        ...options
    });
}

