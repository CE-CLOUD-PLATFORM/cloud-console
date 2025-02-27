import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { InstanceCreate, InstancesQueryParams } from '../types/instance';
import {  postInstance } from '../service';
import { AxiosError } from 'axios';

export const useCreateInstance = (options?: MutationOptions<any, AxiosError, InstanceCreate, unknown>) => {
    return useMutation({
        mutationFn: postInstance,
        ...options
    });
}

