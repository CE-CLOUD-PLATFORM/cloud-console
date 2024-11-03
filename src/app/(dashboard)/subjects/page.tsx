"use client";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/UserContextType";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useQuerySubjects } from "@/services/subject/subjects";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { ISubjectRes, Subject } from "@/interfaces/Subject";
const Page = () => {
  let { user } = useUserContext() as UserContextType;
  let [{ data, loading, error }, refetch] = useQuerySubjects({
    user_id: user?.info?.id as string,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="flex h-full w-full flex-col main">
      <div>
        <h1>Your Subject</h1>
        <Link
          href={"/subjects/new"}
          replace={false}
          className="bg-orange-200 p-1 rounded-md"
        >
          +Subject
        </Link>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        {data?.subjects?.map((data: Subject): ReactNode => {
          return (
            <Link
              key={data.id}
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
