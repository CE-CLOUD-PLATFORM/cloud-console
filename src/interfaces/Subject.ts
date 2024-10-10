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