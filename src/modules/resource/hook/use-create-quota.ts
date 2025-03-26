import { MutationOptions, useMutation } from '@tanstack/react-query';
import { postQuota } from '../service';
import { IQuotaCreate } from '../types/quota';
export const useCreateQuota = (options?: MutationOptions<IQuotaCreate, Error, any>) => {
    return useMutation({ ...options, mutationFn: postQuota })
}