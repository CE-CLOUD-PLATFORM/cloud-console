/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { postInstanceStop } from '../service';
import type { InstanceStopParams } from '../types/instance';

export const useStopInstance = (options?: MutationOptions<any, AxiosError, InstanceStopParams, unknown>) => {
    return useMutation({
        mutationFn: postInstanceStop,
        ...options
    });
}

