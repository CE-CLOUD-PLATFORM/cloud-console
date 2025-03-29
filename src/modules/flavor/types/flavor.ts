/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse } from "@/shared/interfaces/api"

export interface Flavor {
    id: string
    disk: number
    ram: number
    name: string
    rxtx_factor: number
    vcpus: number
    "os-flavor-access:is_public": boolean
    "OS-FLV-EXT-DATA:ephemeral": number
    description: string
    extra_specs: any
}

export interface IFlavorRes extends IResponse {
    flavors: Flavor[]
}