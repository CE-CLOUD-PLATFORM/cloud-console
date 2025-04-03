/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { postInstanceReboot } from '../service';
import type { InstanceRebootParams } from '../types/instance';

export const useRebootInstance = (options?: MutationOptions<any, AxiosError, InstanceRebootParams, unknown>) => {
    return useMutation({
        mutationFn: postInstanceReboot,
        ...options
    });
}

