import type { IResponse } from "@/shared/interfaces/api"
export interface User {
    id: string
    name: string
    description?: string
    domain_id?: string
    enabled?: string
}

export interface IDomainUsersReqParam  {
    domain_id:string
}
export interface IDomainUsersRes extends IResponse {
    users: User[]
}
