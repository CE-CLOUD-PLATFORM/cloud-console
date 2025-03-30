import type { IResponse } from "@/shared/interfaces/api"

export interface Domain {
    description: string
    enabled: boolean
    id: string
    name: string
}
export interface DomainListRes extends IResponse {
    domains: Domain[]
}