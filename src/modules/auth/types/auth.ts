import type { IResponse } from "@/shared/interfaces/api";
import type { UserInfo } from "./user";

export interface IAuthLogin {
    username: string;
    password: string;
    domain: string;
}


export interface IAuthLoginRes extends IResponse {
    token: string;
    user: UserInfo;
    admin:boolean
}

export interface IAuthValidateToken {
    token?: string
}