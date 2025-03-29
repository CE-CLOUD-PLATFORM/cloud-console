/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { postQuota } from '../service';
import type { IQuotaCreate } from '../types/quota';
export const useCreateQuota = (options?: MutationOptions<IQuotaCreate, Error, any>) => {
    return useMutation({ ...options, mutationFn: postQuota })
}