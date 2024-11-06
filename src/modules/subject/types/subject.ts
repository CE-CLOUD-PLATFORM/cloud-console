import type { IResponse } from '@/shared/interfaces/api';

export interface Subject {
  is_domain: boolean;
  description: string;
  domain_id: string;
  enabled: boolean;
  id: string;
  name: string;
  parent_id: string;
  tags: string[];
}

export interface ISubjectsRes extends IResponse {
  subjects: Subject[];
}
