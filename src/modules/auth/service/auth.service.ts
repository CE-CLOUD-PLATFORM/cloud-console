import { axiosInstance } from "@/shared/utils";
import type { ILoginReq, ILoginRes } from "@/shared/interfaces/login";
import { endpoints } from "@/shared/configs";

export const authUser = async (data: ILoginReq): Promise<ILoginRes> => {
  const response = await axiosInstance.post<ILoginRes>(
    endpoints.auth.login,
    data
  );
  return response.data;
};
