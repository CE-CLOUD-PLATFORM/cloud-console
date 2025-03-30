import type { IResponse } from "@/shared/interfaces/api"
import type { User } from "./user"

export interface Member extends User {
    role: string
}

export interface IMemberRes extends IResponse {
    members: Member[]
}
export interface IMemberReqParams {
    subject_id: string
}

export interface IMemberSubjectAdd {
    members: Member[]
    subject_id: string
}
export interface IMemberSubjectDel {
    members: Member
    subject_id: string
}
export interface IMemberSubjectAddRes extends IResponse {
    success: string[]
}
export interface IMemberGroupAdd {
    members: Member[]
    group_id: string
}