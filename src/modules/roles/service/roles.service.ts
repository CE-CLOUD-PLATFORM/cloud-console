import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';

type Params = {
    queryKey: string[];
};


export const getRoles = async ({
    queryKey,
}: Params): Promise<any> => {


    const response = await axiosInstance.get(`${endpoints.domain.roles}`,);
    return response.data;
};