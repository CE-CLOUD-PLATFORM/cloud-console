/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse } from '@/shared/interfaces/api';

export interface ISubjectReqParam {
  subject_id: string
  domain_name: string
}

export interface ISubjectsReqParam {
  user_id: string
}
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

export interface ISubjectRes extends IResponse{
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
  metadata: Metadata
  links: Link2[]
  key_name: string
  adminPass: string
  security_groups: SecurityGroup[]
  "os-extended-volumes:volumes_attached": OsExtendedVolumesVolumesAttached[]
  fault: Fault
  tags: any
  server_groups: any
  "OS-EXT-SRV-ATTR:host": string
  "OS-EXT-SRV-ATTR:instance_name": string
  "OS-EXT-SRV-ATTR:hypervisor_hostname": string
  "OS-EXT-SRV-ATTR:reservation_id": any
  "OS-EXT-SRV-ATTR:launch_index": any
  "OS-EXT-SRV-ATTR:ramdisk_id": any
  "OS-EXT-SRV-ATTR:kernel_id": any
  "OS-EXT-SRV-ATTR:hostname": any
  "OS-EXT-SRV-ATTR:root_device_name": any
  "OS-EXT-SRV-ATTR:user_data": any
  "OS-EXT-STS:task_state": string
  "OS-EXT-STS:vm_state": string
  "OS-EXT-STS:power_state": number
  "OS-DCF:diskConfig": string
  "OS-EXT-AZ:availability_zone": string
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
  private: Private[]
}

export interface Private {
  "OS-EXT-IPS-MAC:mac_addr": string
  "OS-EXT-IPS:type": string
  addr: string
  version: number
}

export type Metadata = object

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
