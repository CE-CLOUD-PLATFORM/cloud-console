"use client";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/userContextType";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useQuerySubjects } from "../API/subject/subjeacts";
import { useCookies } from "react-cookie";

const Page = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  let [{ data, loading, error }, refetch] = useQuerySubjects(
    cookies.token
  );
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="flex h-full w-full flex-col">
      <div>
        <h1>Your Subject</h1>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        {data?.subjects?.map((data: any): ReactNode => {
          return (
            <Link
              href={{ pathname: "/subject/" + data.id }}
              id={data.name}
              className=" flex-[30%] h-[20%] border flex-grow-0 flex justify-center items-center"
            >
              {data.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
