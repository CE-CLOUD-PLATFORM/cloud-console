import SubjectTable from "@/components/Tables/SubjectTable";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";
interface PageProps {
  params: {
    subject_id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="main">
      <div>
        <h1>Subject:{params.subject_id}</h1>
        <div className="flex justify-between">
          <h1>Your Vm</h1>
          <Button className="bg-orange-200">+Instance</Button>
        </div>
        <SubjectTable />
      </div>
    </div>
  );
};

export default Page;
