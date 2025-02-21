import type { IResponse } from '@/shared/interfaces/api';

export interface IGroupsReqParams {
    user_id: string
    subject_id: string
    domain_name: string
}

export interface IGroupCreate {
    name: string
    project_id: string
    domain_name: string
    admin_id: string
    description?: string
}

export interface IGroupInputs {
    name: string
    description?: string
    cores?: number
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