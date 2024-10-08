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