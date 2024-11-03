"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/UserContextType";
import { handleClick } from "./Sidebar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const pageLink = {
  settings: "/settings",
  login: "/auth/signin",
  logout: "/auth/signout",
  subjects: "/subjects",
};

const Navbar = () => {
  let { user } = useUserContext() as UserContextType;
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
      </div>
      <div className="flex items-center space-x-2">
        <div>
          <Link href={pageLink.subjects}>Subjects</Link>
        </div>
        <div className="group nav-profile p-5">
          <Image
            className="w-[35px]"
            src="/assets/navbar/profile-user.png"
            alt=""
            width={40}
            height={40}
          />
          <div
            className="group-hover:flex absolute hidden right-5 top-[45px] flex-col
           p-2 bg-white border rounded-md text-center"
          >
            <Link href={pageLink.settings}>Settings</Link>
            {user?.token ? (
              <h1 className="cursor-pointer" onClick={handleLogout}>
                Logout
              </h1>
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
