import { UserInfo } from "@/modules/auth/types/user";
import type { IResponse } from "@/shared/interfaces/api";

export interface ILoginReq {
  username: string;
  password: string;
  domain: string;
}


export interface ILoginRes extends IResponse {
  token: string;
  user: UserInfo;
}
