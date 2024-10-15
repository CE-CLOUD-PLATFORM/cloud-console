"use client";
import Link from "next/link";
import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/userContextType";
import { handleClick } from "./Sidebar";
import { handleClick as OpenSubjectSelectModal } from "../Modal/SubjectSelectmodal";
import { Button } from "@mui/material";

const pageLink = {
  settings: "/settings",
  login: "/auth/signin",
};

const Navbar = () => {
  let { user } = useUserContext() as UserContextType;

  return (
    <div className="z-[1000] w-full h-nav flex justify-between border-b-gray-100 border-b-2 shadow">
      <div className="flex items-center px-2 gap-5">
        <button className="w-[30px]" onClick={handleClick}>
          <img src="/assets/navbar/more.png" alt="" />
        </button>
        <Link href={"/"} className="w-[30px]">
          <img src="\assets\navbar\logo.png" alt="" />
        </Link>
        {/* <h1 className="text-[28px]">Title</h1> */}
      </div>
      <div className="flex items-center ">
        <Button variant="contained" onClick={OpenSubjectSelectModal}>Subject</Button>
        <div className="group nav-profile">
          <img
            className="w-[35px]"
            src=" \assets\navbar\profile-user.png"
            alt=""
          />
          <div
            className="group-hover:flex absolute hidden right-0 flex-col
           p-2 min-w-[250px] bg-white border rounded-md"
          >
            <button>{user?.token}</button>
            <button>2</button>
            <button>3</button>
            <Link href={pageLink.login}>Login</Link>
            <Link href={pageLink.settings}>Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
