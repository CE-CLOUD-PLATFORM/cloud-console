import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IGroupCreate } from '../types/group';
import { postGroup } from '../service';

export const useCreateGroup = (options?: MutationOptions<any, AxiosError, IGroupCreate, unknown>) =>
  useMutation({
    mutationFn: postGroup,
    ...options
  });

