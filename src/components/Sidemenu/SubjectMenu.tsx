"use client";

import React from "react";
import "./style.css";
import Link from "next/link";

let menu = [{ label: "Groups", path: "groups" }];
const SubjectMenu = () => {
  
  return (
    <div className="side-menu">
      {menu.map((item) => {
        return (
          <Link href={`${window.location.pathname}/${item.path}`} replace={false}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubjectMenu;
