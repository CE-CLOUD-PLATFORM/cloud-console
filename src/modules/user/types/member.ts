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
}