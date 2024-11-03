"use client";
import useAxios from "../API";
import { Options } from "axios-hooks";
import { PublicKeyParams, PublicKeyReq, PublicKeyRes } from "@/interfaces/keys";
const path = {
  base: "/config/public-key",
};

export const useQueryPublicKeys = (params: PublicKeyParams, option?: Options) => {
  return useAxios<PublicKeyRes>({
    url: path.base,
    method: "GET",
    params
  }, option);
};

export const usePostPublicKey = (data?: PublicKeyReq, option?: Options) => {
  return useAxios({
    url: path.base,
    method: "POST",
    data
  }, option);
};