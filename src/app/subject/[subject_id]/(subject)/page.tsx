import SubjectTable from "@/components/Tables/SubjectTable";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";
interface PageProps {
  params: {
    subject_id: string;
  };
}

const pageLink = { newInstance: "instance/new" };

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="main">
      <div>
        <h1>Subject:{params.subject_id}</h1>
        <div className="flex justify-between">
          <h1>Your Vm</h1>
          <Link
            href={params.subject_id + "/" + pageLink.newInstance}
            className="bg-orange-200 p-1 rounded-md"
          >
            +Instance
          </Link>
        </div>
        <SubjectTable />
      </div>
    </div>
  );
};

export default Page;
