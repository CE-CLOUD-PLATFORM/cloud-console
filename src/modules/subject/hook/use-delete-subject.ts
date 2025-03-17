import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { deleteSubject } from '../service';
import { AxiosError } from 'axios';

export const useDeleteSubject = (options?:MutationOptions<any,AxiosError,string,unknown>) =>
  useMutation({
    mutationFn: deleteSubject,
    ...options
  });

