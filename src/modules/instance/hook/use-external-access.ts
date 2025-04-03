/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { InstanceExternalAccessParams } from '../types/instance';
import type { AxiosError } from 'axios';
import { postExternalAccess } from '../service';

export const useExternalAccess = (
  options?: MutationOptions<any, AxiosError, InstanceExternalAccessParams, unknown>,
) => {
  return useMutation({
    mutationFn: postExternalAccess,
    ...options,
  });
};
