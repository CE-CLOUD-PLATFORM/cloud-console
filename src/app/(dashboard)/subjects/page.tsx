"use client";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/UserContextType";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useQuerySubjects } from "@/services/subject/subjects";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SubjectIcon from "@mui/icons-material/Subject";
import { Subject } from "@/interfaces/Subject";
const Page = () => {
  let { user } = useUserContext() as UserContextType;
  let [{ data, loading, error }, refetch] = useQuerySubjects({
    user_id: user?.info?.id as string,
  });
  console.log(loading);
  return (
    <div className="flex min-h-screen w-full flex-col p-6 space-y-5">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">
            <SubjectIcon /> Subjects
          </h1>
        </div>
        <div>
          <Link
            href={"/subjects/new"}
            replace={false}
            className="bg-green-300 p-2 text-sm rounded-md flex items-center transition-all border hover:shadow-sm"
          >
            <AddBoxIcon /> create
          </Link>
        </div>
      </div>
      <hr className="border border-black" />
      <div className={`${loading ? "w-full" : "grid md:grid-cols-3 gap-4"}`}>
        {loading && (
          <div className="text-center px-3 py-10 rounded-md border shadow-md cursor-pointer hover:border-slate-400 transition-all">
            Loading
          </div>
        )}
        {!loading &&
          data?.subjects?.map((data: Subject): ReactNode => {
            return (
              <Link
                key={data.id}
                className="text-center px-3 py-10 rounded-md border shadow-md cursor-pointer hover:border-slate-400 transition-all"
                href={{ pathname: "/subject/" + data.id }}
                id={data.name}
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
