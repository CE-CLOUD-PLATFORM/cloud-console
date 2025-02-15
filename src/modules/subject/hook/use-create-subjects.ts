import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { postSubject } from '../service';
import { ISubjectCreate } from '../types/subject';
import { AxiosError } from 'axios';

export const useCreateSubject = (options?:MutationOptions<any,AxiosError,ISubjectCreate,unknown>) =>
  useMutation({
    mutationFn: postSubject,
    ...options
  });

