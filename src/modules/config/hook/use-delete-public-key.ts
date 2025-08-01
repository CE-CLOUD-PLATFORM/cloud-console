/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteUserPublicKey } from '../service';

/**
 * Hook for deleting SSH public key
 * @param options - Optional mutation options for customizing behavior
 * @returns UseMutation hook for deleting SSH key
 */
export const useDeletePublicKey = (
    options?: MutationOptions<any, AxiosError, string>
) => {
    return useMutation({
        mutationFn: deleteUserPublicKey,
        ...options,
    });
};

