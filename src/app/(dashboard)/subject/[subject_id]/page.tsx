"use client";
import InstanceTable from "@/components/Tables/InstanceTable";
import { useQuerySubject } from "@/services/subject/subject";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

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
    <div className="flex min-h-screen w-full flex-col p-6 space-y-5">
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">
            Subject : {data?.subject?.name}
          </h1>
        </div>
        <div className="flex justify-between my-4 items-center">
          <div>
            <h1>Instances List</h1>
          </div>
          <div>
            <Link
              href={params.subject_id + "/" + pageLink.newInstance}
              className="bg-green-300 p-2 text-sm rounded-md flex items-center transition-all border hover:shadow-sm"
            >
              <AddBoxIcon /> create
            </Link>
          </div>
        </div>
        <InstanceTable params={params} data={data?.instances} />
      </div>
    </div>
  );
};

export default Page;
