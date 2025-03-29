/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { IGroupCreate } from '../types/group';
import { postGroup } from '../service';

export const useCreateGroup = (options?: MutationOptions<any, AxiosError, IGroupCreate, unknown>) =>
  useMutation({
    mutationFn: postGroup,
    ...options
  });

