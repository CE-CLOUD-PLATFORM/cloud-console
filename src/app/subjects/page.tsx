"use client";
import { useUserContext } from "@/contexts/UserContext";
import { SubjectList } from "@/interfaces/subject";
import { UserContextType } from "@/interfaces/UserContextType";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

const Page = () => {
  let { user, getUserSubjects } = useUserContext() as UserContextType;
  const [data, setdata] = useState<SubjectList>();
  useEffect(() => {
    if (!data) {
      setdata(getUserSubjects());
    }
  }, []);
  return (
    <div className="flex h-full w-full flex-col">
      <div>
        <h1>Your Subject</h1>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        {data?.subjects.map((data: any): ReactNode => {
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
