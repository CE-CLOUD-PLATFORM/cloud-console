"use client";

import React from "react";
import "./style.css";
import Link from "next/link";

let menu = [
  { label: "Instances", path: "subject" },
  { label: "Groups", path: "groups" },
];
const SubjectMenu = () => {
  return (
    <div className="side-menu">
      {menu.map((item) => {
        return (
          <Link key={item.path} href={item.path} replace={false}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubjectMenu;
