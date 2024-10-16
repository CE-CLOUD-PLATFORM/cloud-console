"use client";

import React from "react";
import "./style.css";
import Link from "next/link";
import { PageProps } from "../../../.next/types/app/layout";

let menu = [{ label: "Groups", path: "groups" }];
const SubjectMenu = () => {
  return (
    <div className="side-menu">
      {menu.map((item) => {
        return (
          <Link
            key={item.path}
            href={`${window.location.pathname}/${item.path}`}
            replace={false}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubjectMenu;
