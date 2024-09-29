import React, { MouseEventHandler } from "react";
import "./style.css";
import Link from "next/link";

const Menu = [{ label: "Settings", path: "settings", position: "bot" }];

export const handleClick = () => {
  if (document.getElementById("sidebar-cover")!.classList.contains("hidden")) {
    document.getElementById("sidebar-cover")!.classList.toggle("hidden");
    setTimeout(() => {
      document
        .getElementById("sidebar-cover")!
        .classList.toggle("sidebar-cover-active");
      document
        .getElementById("sidebar-menu")!
        .classList.toggle("sidebar-menu-active");
    }, 100);
  } else {
    document
      .getElementById("sidebar-cover")!
      .classList.toggle("sidebar-cover-active");
    document
      .getElementById("sidebar-menu")!
      .classList.toggle("sidebar-menu-active");
    setTimeout(() => {
      document.getElementById("sidebar-cover")!.classList.toggle("hidden");
    }, 200);
  }
};
const Sidebar = () => {
  return (
    <div
      id="sidebar-cover"
      className="absolute hidden bg-opacity-0 duration-100 w-full h-main bg-black  "
      onClick={handleClick}
    >
      <div
        id="sidebar-menu"
        className="h-full duration-200 relative translate-x-[-100%] w-[220px] bg-white flex flex-col justify-between px-4 py-6"
      >
        <div className="sidebar-top">
          {Menu.filter((item) => item.position === "top").map((item) => (
            <Link key={item.label} href={`/${item.path}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="sidebar-bot">
          {Menu.filter((item) => item.position === "bot").map((item) => (
            <Link key={item.label} href={`/${item.path}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
