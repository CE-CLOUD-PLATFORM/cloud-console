"use client";
import Link from "next/link";
import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/userContextType";
import { handleClick } from "./Sidebar";

const pageLink = {
  settings: "/settings",
  login: "/auth/login",
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
        <div>
          {/* https://flowbite.com/docs/components/dropdowns/ */}
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="click"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Project
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdownHover"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <Link
                  href="/subjects"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  All Subject
                </Link>
              </li>
            </ul>
          </div>
        </div>
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
