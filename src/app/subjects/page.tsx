"use client"
import { useUserContext } from "@/contexts/UserContext";
import { SubjectList } from "@/interfaces/Subject";
import { UserContextType } from "@/interfaces/UserContextType";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";



const Page = () => {
  let {user,getUserSubjects} = useUserContext() as UserContextType
  const [data, setdata] = useState<SubjectList>()
  useEffect(()=>{
    if(!data){
      setdata(getUserSubjects())
    }
  },[]) 
  return (
    <div className="flex h-full flex-col">
      <div>
        <h1>Your Subject</h1>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        {data?.subjects.map((data: any): ReactNode => {
          return (
            <div id={data.name} className=" flex-[30%] h-[20%] border flex-grow-0 flex justify-center items-center">
              
              <Link href={"/subject/a"}>{data.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
