import type { IResponse } from '@/shared/interfaces/api';

export interface IGroupsReqParams {
    user_id: string
    subject_id: string
    domain_name: string
}

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

export interface IGroupsRes extends IResponse {
    groups: Group[]
}

export interface IGroupRes extends IResponse {
    group: Group
}