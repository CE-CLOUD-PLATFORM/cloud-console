"use client";
import React, { MouseEventHandler } from "react";
import "./style.css";
import Link from "next/link";

const Menu = [{ label: "Settings", path: "settings", position: "bot" }];

export const handleClick = () => {
  if (document.getElementById("subject-select-modal-cover")!.classList.contains("hidden")) {
    document.getElementById("subject-select-modal-cover")!.classList.toggle("hidden");
    setTimeout(() => {
      document
        .getElementById("subject-select-modal-cover")!
        .classList.toggle("subject-select-modal-cover-active");
      document
        .getElementById("subject-select-modal-menu")!
        .classList.toggle("subject-select-modal-menu-active");
    }, 100);
  } else {
    document
      .getElementById("subject-select-modal-cover")!
      .classList.toggle("subject-select-modal-cover-active");
    document
      .getElementById("subject-select-modal-menu")!
      .classList.toggle("subject-select-modal-menu-active");
    setTimeout(() => {
      document.getElementById("subject-select-modal-cover")!.classList.toggle("hidden");
    }, 200);
  }
};
const SubjectSelectModal = () => {
  return (
    <div
      id="subject-select-modal-cover"
      className="absolute flex hidden bg-opacity-0 duration-200 w-full h-main bg-black   justify-center items-center"
      onClick={handleClick}
    >
      <div
        id="subject-select-modal-menu"
        className="h-1/2 duration-100 opacity-0 relative w-1/2 bg-white flex flex-col justify-between px-4 py-6 translate-y-[-25%]"
      >
        t
      </div>
    </div>
  );
};

export default SubjectSelectModal;
