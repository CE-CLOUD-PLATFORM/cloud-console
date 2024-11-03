"use client";
import InstanceTable from "@/components/Tables/InstanceTable";
import { useQuerySubject } from "@/services/subject/subject";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
interface PageProps {
  params: {
    subject_id: string;
  };
}

const pageLink = { newInstance: "instance/new" };

const Page: React.FC<PageProps> = ({ params }) => {
  let [{ data, loading, error }, refetch] = useQuerySubject(params);
  useEffect(() => {
    console.log(data);
    
  }, [data]);
  return (
    <div className="main">
      <div>
        <h1>Subject:{data?.subject?.name}</h1>
        <div className="flex justify-between">
          <h1>Your Vm</h1>
          <Link
            href={params.subject_id + "/" + pageLink.newInstance}
            className="bg-orange-200 p-1 rounded-md"
          >
            +Instance
          </Link>
        </div>
        <InstanceTable params={params} data={data?.instances}/>
      </div>
    </div>
  );
};

export default Page;
