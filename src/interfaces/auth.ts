import { IResponse } from "./api"

export interface ILoginReq {
    username: string
    password: string
    domain: string
}
export interface ILoginRes extends IResponse {
    token: string
}