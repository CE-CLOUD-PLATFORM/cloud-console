/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { InstanceCreate} from '../types/instance';
import {  postInstance } from '../service';
import type { AxiosError } from 'axios';

export const useCreateInstance = (options?: MutationOptions<any, AxiosError, InstanceCreate, unknown>) => {
    return useMutation({
        mutationFn: postInstance,
        ...options
    });
}

