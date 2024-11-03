import { IResponse } from "./api"
import { Instance } from "./Instance"
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

export interface SubjectListReqParam {
    user_id: string
}
export interface ISubjectRes extends IResponse {
    instances: Instance[]
    subject: Subject
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
