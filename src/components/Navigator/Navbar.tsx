"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/UserContextType";
import { handleClick } from "./Sidebar";
import { Button } from "@mui/material";

const pageLink = {
  settings: "/settings",
  login: "/auth/signin",
  logout: "/auth/signout",
  subjects: "/subjects",
};

const Navbar = () => {
  let { user } = useUserContext() as UserContextType;
  console.log(user);
  return (
    <div className="z-[1000] w-full h-nav flex justify-between border-b-gray-100 border-b-2 shadow">
      <div className="flex items-center px-2 gap-5">
        <button className="w-[30px]" onClick={handleClick}>
          <Image
            width={30}
            height={30}
            priority
            src="/assets/navbar/more.png"
            alt=""
          />
        </button>
        <Link href={"/"} className="w-[30px]">
          <Image
            width={30}
            height={30}
            priority
            src="/assets/navbar/logo.png"
            alt=""
          />
        </Link>
        {/* <h1 className="text-[28px]">Title</h1> */}
      </div>
      <div className="flex items-center ">
        <Button
          variant="contained"
          // onClick={OpenSubjectSelectModal}
        >
          {/* Subjects */}
          <Link href={pageLink.subjects}>Subjects</Link>
        </Button>
        <div className="group nav-profile">
          <Image
            className="w-[35px]"
            src="/assets/navbar/profile-user.png"
            alt=""
          />
          <div
            className="group-hover:flex absolute hidden right-0 flex-col
           p-2 min-w-[250px] bg-white border rounded-md"
          >
            <Link href={pageLink.settings}>Settings</Link>
            {user?.token ? (
              <Link href={pageLink.logout}>Logout</Link>
            ) : (
              <Link href={pageLink.login}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
