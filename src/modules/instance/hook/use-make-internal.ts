/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { MakeInternal } from '../types/instance';
import { makeInternal } from '../service';
import type { AxiosError } from 'axios';

export const useMakeInternal = (
  options?: MutationOptions<any, AxiosError, MakeInternal, unknown>,
) => {
  return useMutation({
    mutationFn: makeInternal,
    ...options,
  });
};
