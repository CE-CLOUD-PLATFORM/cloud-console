import { IResponse } from "@/shared/interfaces/api"

export interface Member {
    id: string
    role: string
    name: string
    enabled: string
}

export interface IMemberRes extends IResponse {
    members: Member[]
}
export interface IMemberReqParams  {
    subject_id:string
}