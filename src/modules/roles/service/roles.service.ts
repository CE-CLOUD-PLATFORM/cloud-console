/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import { RolesRes } from '../types/role';

type Params = {
    queryKey: string[];
};


export const getRoles = async ({
    queryKey,
}: Params): Promise<RolesRes> => {


    const response = await axiosInstance.get(`${endpoints.domain.roles}`,);
    return response.data;
};