/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { postSubject } from '../service';
import type { ISubjectCreate } from '../types/subject';
import type { AxiosError } from 'axios';

export const useCreateSubject = (options?:MutationOptions<any,AxiosError,ISubjectCreate,unknown>) =>
  useMutation({
    mutationFn: postSubject,
    ...options
  });

