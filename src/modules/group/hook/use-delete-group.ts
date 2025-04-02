/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteGroup } from '../service';
import type { IGroupDelete } from '../types/group';

export const useDeleteGroup = (options?: MutationOptions<any, AxiosError, IGroupDelete, unknown>) =>
  useMutation({
    mutationFn: deleteGroup,
    ...options
  });

