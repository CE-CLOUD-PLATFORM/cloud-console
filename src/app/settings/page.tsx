import { redirect } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
const Page = () => {
  redirect('settings/keys'); 
  return null;
  // return (
  //   <div className="main">
 
  //   </div>
  // );
};
export default Page;
