"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navigator/Navbar";
import Sidebar from "@/components/Navigator/Sidebar";
import UserProvider from "@/contexts/UserContext";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import SubjectSelectModal from "@/components/Modal/SubjectSelectmodal";
const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "CE Cloud Console",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  useEffect(() => {
    NProgress.start();
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [pathname]);
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <UserProvider>
          <div>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}