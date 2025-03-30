/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { PublicKeyReq } from '../types/public-key';
import { postUserPublicKey } from '../service';

export const useCreateSshKey = (options?: MutationOptions<any, AxiosError, PublicKeyReq, unknown>) => {
    return useMutation({
        mutationFn: postUserPublicKey,
        ...options
    });
}

