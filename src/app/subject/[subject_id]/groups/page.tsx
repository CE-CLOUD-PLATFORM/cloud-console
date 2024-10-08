import React from "react";
import Link from "next/link";
const pageLink = {
  newGroup: "groups/new",
};

const Page = () => {

  return (
    <div className="main pl-[250px]">
      <h1>Groups</h1>
      <Link href={pageLink.newGroup} replace={false}>
        Create
      </Link>
    </div>
  );
};
export default Page;
