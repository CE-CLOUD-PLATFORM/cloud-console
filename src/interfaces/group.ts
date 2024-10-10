import { IResponse } from "./api"

export interface NewGroupRequest extends NewGroupInputs {
    domain_id: string
    quota_set: GroupQuotaSet
}

export interface NewGroupInputs {
    name: string
    description: string
    cores: number
    instances: number
    ram: number
}
export interface GroupQuotaSet {
    cores: number
    instances: number
    ram: number
}

export interface Group {
    is_domain: boolean
    description: string
    domain_id: string
    enabled: boolean
    id: string
    name: string
    parent_id: string
    tags: string[]
}

export interface IGroupList extends IResponse {
    groups: Group[]
}