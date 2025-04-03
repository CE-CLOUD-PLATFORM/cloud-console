/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { InstanceMakeInternalParams } from '../types/instance';
import type { AxiosError } from 'axios';
import { deleteMakeInternal } from '../service';

export const useMakeInternal = (
  options?: MutationOptions<any, AxiosError, InstanceMakeInternalParams, unknown>,
) => {
  return useMutation({
    mutationFn: deleteMakeInternal,
    ...options,
  });
};
