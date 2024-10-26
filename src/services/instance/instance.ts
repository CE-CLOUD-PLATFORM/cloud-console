"use client";
import useAxios from "../API";
import { Options } from "axios-hooks";
import { InstanceOptionRes, InstanceQueryOptionParam, InstanceQueryParam, InstanceReq, InstanceRes } from "@/interfaces/Instance";
const path = {
  base: "/server",
  option:'/options'
};

export const useQueryInstance = (params: InstanceQueryParam, option?: Options) => {
  return useAxios<InstanceRes>({
    url: path.base,
    method: "GET",
    params
  }, option);
};
export const useQueryInstanceOption = (params: InstanceQueryOptionParam, option?: Options) => {
  return useAxios<InstanceOptionRes>({
    url: path.base+path.option,
    method: "GET",
    params
  }, option);
};
export const usePostInstance = (data?: InstanceReq, option?: Options) => {
  return useAxios({
    url: path.base,
    method: "POST",
    data
  }, option);
};