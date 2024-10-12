import React, { ReactElement, ReactNode } from "react";
import InstanceLayout from "./layout";
import page from "@/app/auth/signin/page";

const Page = () => {
  return (
    <div className="main">
      <div>
        <h1>VM1</h1>
        <p>information:</p>
        <p>spec:</p>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        <button className="bg-blue-500 text-white rounded w-full py-2">
          Open VNC
        </button>
      </div>
    </div>
  );
};
export default Page;
