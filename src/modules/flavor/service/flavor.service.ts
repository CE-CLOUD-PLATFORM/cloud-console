import { axiosInstance } from '@/shared/utils';
import { endpoints } from '@/shared/configs';
import type { IFlavorRes } from '../types/flavor';

export const getFlavors = async (): Promise<IFlavorRes> => {
  const response = await axiosInstance.get<
    IFlavorRes
  >(`${endpoints.flavor.list}`);
  return response.data;
};
