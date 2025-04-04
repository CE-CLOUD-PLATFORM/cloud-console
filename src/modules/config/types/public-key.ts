
import type { IResponse } from "@/shared/interfaces/api";

export interface PublicKey {
    id: string
    created_at: string
    updated_at: string
    user_id: string
    name: string
    key: string
    status: string
}

export interface PublicKeyReqParams {
    user_id: string
}
export interface PublicKeyRes extends IResponse {
    keys: PublicKey[]
}
export interface PublicKeyReq {
    user_id: string
    name: string
    key: string
}