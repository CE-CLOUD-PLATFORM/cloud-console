"use client";

import React, { useEffect } from "react";
import "./style.css";
import Link from "next/link";
import GroupsIcon from "@mui/icons-material/Groups";
import ComputerIcon from "@mui/icons-material/Computer";
interface pageProps {
  subject_id: string;
}

const SubjectMenu = ({subject_id}: pageProps) => {
  let menu = [
    {
      label: "Instances",
      path: `/subject/${subject_id}`,
      icon: <ComputerIcon className="mr-2" />,
    },
    { label: "Groups", path: "/groups", icon: <GroupsIcon className="mr-2" /> },
  ];
  return (
    <div className="side-menu">
      {menu.map((item) => {
        return (
          <Link
            href={item.path}
            replace={false}
            className="flex items-center px-3 py-1 transition-all text-lg font-semibold hover:bg-slate-200 cursor-pointer"
            key={item.path}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubjectMenu;
