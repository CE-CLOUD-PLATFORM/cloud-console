import { MutationOptions, useMutation } from '@tanstack/react-query';
import { patchQuotaApproval, postQuota } from '../service';
export const useApprovalQuota = (options?: MutationOptions<any, Error, any>) => {
    return useMutation({ ...options, mutationFn: patchQuotaApproval })
}