import { SubjectResource } from "@/modules/subject/types/subject";
import { IResponse } from "@/shared/interfaces/api";

export interface Quota {
    id: string;
    created_at: Date;
    updated_at: Date;
    request_user_id: string;
    subject_name: string;
    subject_description: string;
    req_resource: SubjectResource;
    status: string;
    detail: string;
    subject_academic_year: string;
    subject_domain_id: string;
}
export interface IQuotaResponse extends IResponse {
    quotas: Quota[]
}
export interface IQuotaCreate {
    request_user_id: string;
    subject_name: string;
    subject_description: string;
    req_resource?: SubjectResource;
    detail: string;
    subject_academic_year: string;
    subject_domain_id: string;
}
export type QuotaStatus = 'pending' | 'requesting' | 'accepted' | 'rejected' | 'revision_required'