/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IMemberSubjectDel } from '@/modules/user/types/member';
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteSubjectMember } from '../service';

export const useDeleteSubject = (options?: MutationOptions<any, AxiosError, IMemberSubjectDel, unknown>) =>
  useMutation({
    mutationFn: deleteSubjectMember,
    ...options
  });

