/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMemberSubjectDel } from '@/modules/user/types/member';
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteSubjectMember } from '../service';

export const useDeleteSubjectMember = (options?: MutationOptions<any, AxiosError, IMemberSubjectDel, unknown>) =>
  useMutation({
    mutationFn: deleteSubjectMember,
    ...options
  });

