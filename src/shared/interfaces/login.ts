import { IResponse } from "@/shared/interfaces/api";

export interface ILoginReq {
  username: string;
  password: string;
  domain: string;
}

export interface UserInfo {
  domain: Domain;
  id: string;
  name: string;
}

export interface Domain {
  id: string;
  name: string;
}
export interface ILoginRes extends IResponse {
  token: string;
  user: UserInfo;
}
