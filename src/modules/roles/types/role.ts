import { IResponse } from "@/shared/interfaces/api"

export interface Role {
    id: string
    name: string
}
export interface RolesRes extends IResponse {
    roles: Role[]
}