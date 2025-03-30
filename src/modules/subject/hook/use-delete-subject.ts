/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteSubject } from '../service';
import type { ISubjectDelete } from '../types/subject';

export const useDeleteSubject = (options?:MutationOptions<any,AxiosError,ISubjectDelete,unknown>) =>
  useMutation({
    mutationFn: deleteSubject,
    ...options
  });

