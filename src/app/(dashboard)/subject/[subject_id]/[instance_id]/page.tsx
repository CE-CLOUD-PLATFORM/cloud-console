"use client";
import { useQueryInstance } from "@/services/instance/instance";
import React, { ReactElement, ReactNode } from "react";

interface PageProps {
  params: {
    instance_id: string;
    subject_id: string;
  };
}
const Page = ({params}:PageProps) => {
  console.log(params);
  
  let [{data,loading,error},refetch] = useQueryInstance(params)

  return (
    <div className="main">
      <div>
        <h1>VM1</h1>
        <p>information:{data?.instance.name}</p>
        <p>spec:</p>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        <button className="bg-blue-500 text-white rounded w-full py-2">
          Open VNC
        </button>
      </div>
    </div>
  );
};
export default Page;
