import React, { MouseEventHandler } from "react";
import "./style.css";
const Sidebar = () => {
  return (
    <div
      id="sidebar-cover"
      className="absolute hidden bg-opacity-0 duration-100 w-full h-main bg-black  "
    >
      <div
        id="sidebar-menu"
        className="h-full duration-200 relative translate-x-[-100%] w-[220px] bg-white flex flex-col justify-between"
      >
        <div className="sidebar-top">1</div>
        <div className="sidebar-bot">1</div>
      </div>
    </div>
  );
};

export default Sidebar;
