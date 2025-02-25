import { axiosInstance } from '@/shared/utils';
import type {
  ISubjectsReqParam,
} from '@/modules/subject/types/subject';
import { endpoints } from '@/shared/configs';
import { PublicKeyReqParams, PublicKeyRes } from '../types/public-key';

type Params = {
  queryKey: string[];
};

export const getUserPublicKeys = async ({
  queryKey,
}: Params): Promise<PublicKeyRes> => {
  const [_, user_id] = queryKey;

  const params: PublicKeyReqParams = {
    user_id,
  };
  const response = await axiosInstance.get<
    PublicKeyRes,
    any,
    PublicKeyReqParams
  >(`${endpoints.config.publicKey}`, { params });
  return response.data;
};
