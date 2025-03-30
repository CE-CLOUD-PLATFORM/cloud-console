// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IResponse } from "@/shared/interfaces/api"

export interface Role {
    id: string
    name: string
}
export interface RolesRes extends IResponse {
    roles: Role[]
}