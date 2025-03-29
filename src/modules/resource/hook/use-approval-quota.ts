/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { patchQuotaApproval } from '../service';
export const useApprovalQuota = (options?: MutationOptions<any, Error, any>) => {
    return useMutation({ ...options, mutationFn: patchQuotaApproval })
}