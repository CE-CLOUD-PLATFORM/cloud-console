/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { deleteSubject } from '../service';
import type { AxiosError } from 'axios';

export const useDeleteSubject = (options?:MutationOptions<any,AxiosError,string,unknown>) =>
  useMutation({
    mutationFn: deleteSubject,
    ...options
  });

