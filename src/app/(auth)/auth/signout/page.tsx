"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
const Page = () => {
  // const [, execute] = useLogout();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  useEffect(() => {
    removeCookie("token", { path: "/" });
    router.push("/");
  });
  return <div className="">a</div>;
};
export default Page;
