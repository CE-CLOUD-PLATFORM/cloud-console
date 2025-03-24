import { IResponse } from "@/shared/interfaces/api";
import { UserInfo } from "./user";

export interface IAuthLogin {
    username: string;
    password: string;
    domain: string;
}


export interface IAuthLoginRes extends IResponse {
    token: string;
    user: UserInfo;
}

export interface IAuthValidateToken {
    token?: string
}