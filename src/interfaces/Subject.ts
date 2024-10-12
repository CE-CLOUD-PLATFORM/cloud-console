import { IResponse } from "./api"

export interface Subject {
    is_domain: boolean
    description: string
    domain_id: string
    enabled: boolean
    id: string
    name: string
    parent_id: string
    tags: string[]
}

export interface NewSubjectRequest {
    subject: NewSubjectInputs
}

export interface NewSubjectInputs {
    description: string
    name: string
}




export interface ISubjectsRes extends IResponse {
    subjects: Subject[]
}
export interface SubjectReqParam {
    subject_id: string
}


export interface ISubjectRes extends IResponse {
    instances: Instance[]
    subject: Subject
}

export interface Instance {
    id: string
    tenant_id: string
    user_id: string
    name: string
    updated: string
    created: string
    hostid: string
    status: string
    progress: number
    accessIPv4: string
    accessIPv6: string
    flavor: Flavor
    addresses: Addresses
    metadata: any
    links: Link2[]
    key_name: string
    adminPass: string
    security_groups: SecurityGroup[]
    "os-extended-volumes:volumes_attached": OsExtendedVolumesVolumesAttached[]
    fault: Fault
    tags: any
    server_groups: any
}

export interface Flavor {
    id: string
    links: Link[]
}

export interface Link {
    href: string
    rel: string
}

export interface Addresses {
    shared: Shared[]
}

export interface Shared {
    "OS-EXT-IPS-MAC:mac_addr": string
    "OS-EXT-IPS:type": string
    addr: string
    version: number
}

export interface Link2 {
    href: string
    rel: string
}

export interface SecurityGroup {
    name: string
}

export interface OsExtendedVolumesVolumesAttached {
    id: string
}

export interface Fault {
    code: number
    created: string
    details: string
    message: string
}

export interface Subject {
    is_domain: boolean
    description: string
    domain_id: string
    enabled: boolean
    id: string
    name: string
    parent_id: string
    tags: string[]
}
