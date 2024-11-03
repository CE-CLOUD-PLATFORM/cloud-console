"use client";

import React from "react";
import "./style.css";
import Link from "next/link";
import GroupsIcon from "@mui/icons-material/Groups";
import ComputerIcon from "@mui/icons-material/Computer";

let menu = [
  {
    label: "Instances",
    path: "/subject",
    icon: <ComputerIcon className="mr-2" />,
  },
  { label: "Groups", path: "/groups", icon: <GroupsIcon className="mr-2" /> },
];
const SubjectMenu = () => {
  return (
    <div className="side-menu">
      {menu.map((item) => {
        return (
          <Link
            href={item.path}
            replace={false}
            className="flex items-center p-5 transition-all text-lg font-semibold hover:bg-slate-200 cursor-pointer"
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
