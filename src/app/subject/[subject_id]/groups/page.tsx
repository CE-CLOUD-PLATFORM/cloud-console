"use client";
import React from "react";
import Link from "next/link";
import { useQueryGroups } from "@/services/group/groups";
import { Subject } from "@/interfaces/subject";
const pageLink = {
  newGroup: "groups/new",
};
interface PageProps {
  params: {
    subject_id: string;
  };
}
const Page: React.FC<PageProps> = ({ params }) => {
  
const [{data,loading,error},refetch] = useQueryGroups(params.subject_id)
  return (
    <div className="main pl-[250px]">
      <h1>Groups</h1>
      
      <Link href={pageLink.newGroup} replace={false}>
        Create
      </Link>
      <div className="flex flex-col">
        {data?.groups?.map((group: Subject) => {
          return (
            <Link  key={group.id} href={`/subject/${params.subject_id}/group/${group.id}`} replace={false}>
              {group.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
