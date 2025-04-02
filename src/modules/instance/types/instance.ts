/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse } from '@/shared/interfaces/api';
export type InstanceStatus = "ACTIVE" | "BUILD" | "SHUTOFF" | "REBUILD" | string
export interface InstanceCreate {
    name: string;
    subject_id: string;
    flavor_id: string;
    image_id: string;
    volume_size: number;
    public_key: string[];
    username: string;
    password: string;
}
export interface InstanceDelete {
    subject_id: string;
    instance_id: string
}
export interface InstancesQueryParams {
    subject_id: string;
}
export interface InstanceQueryParams {
    instance_id: string
    subject_id: string;
}
export interface InstanceOptionQueryParam {
    subject_id: string
}
export interface InstancesRes extends IResponse {
    instances: Instance[];
}
export interface InstanceRes extends IResponse {
    instance: Instance;
}
export interface InstanceVNCRes extends IResponse {
    url: string
}
export interface InstanceOptionRes extends IResponse {
    flavors: Flavor[]
    images: Image[]
}
export interface Instance {
    id: string
    tenant_id: string
    user_id: string
    name: string
    updated: string
    created: string
    hostid: string
    status: InstanceStatus
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

}

export interface Flavor {
    id: string
    disk?: number
    ram?: number
    name?: string
    rxtx_factor?: number
    vcpus?: number
    description?: string
    extra_specs?: any
    links?: Link[]
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

export interface Metadata {
    image_id: string
    domain_name: string
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
export interface Image {
    id: string
    name: string
    status: string
    tags: any[]
    container_format: string
    disk_format: string
    min_disk: number
    min_ram: number
    owner: string
    protected: boolean
    visibility: string
    os_hidden: boolean
    checksum: string
    metadata: {
        logo_url: string
    }
    Properties: ImageProperties
    created_at: string
    updated_at: string
    file: string
    schema: string
    virtual_size: number
}
export interface ImageProperties {
    logo_url: string
    os_hash_algo: string
    os_hash_value: string
    stores: string
}