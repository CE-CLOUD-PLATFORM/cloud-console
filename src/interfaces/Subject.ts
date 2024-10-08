export interface SubjectList {
    subjects: Subject[]
}
export interface Subject {
    id: string,
    name: string
}

export interface NewSubjectRequest {
    subject: NewSubjectInputs
}

export interface NewSubjectInputs {
    description: string
    name: string
}

