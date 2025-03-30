/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { postSubjectMember } from '../service';
import type { AxiosError } from 'axios';
import { IMemberSubjectAdd } from '@/modules/user/types/member';

export const useAddSubjectMember = (options?: MutationOptions<any, AxiosError, IMemberSubjectAdd, unknown>) =>
  useMutation({
    mutationFn: postSubjectMember,
    ...options
  });

