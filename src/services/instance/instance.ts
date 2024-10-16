"use client";
import useAxios from "../API";
import { Options } from "axios-hooks";
import { InstanceQueryParam, InstanceRes } from "@/interfaces/Instance";
const path = {
  get: {
    url: "/api/v1/server/",
    method: "GET",
  },
};

export const useQueryInstance = (params:InstanceQueryParam,option?:Options) => {
  return useAxios<InstanceRes>({
    url: path.get.url,
    method: path.get.method,
    params
  },option);
};

export const usePostInstance = (params:InstanceQueryParam,option?:Options) => {
  return useAxios<InstanceRes>({
    url: path.get.url,
    method: path.get.method,
    params
  },option);
};