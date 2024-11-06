"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navigator/Navbar";
import Sidebar from "@/components/Navigator/Sidebar";
import styles from "./page.module.css";
import UserProvider from "@/contexts/UserContext";
import SubjectSelectModal from "@/components/Modal/SubjectSelectmodal";

const metadata: Metadata = {
  title: "CE Cloud Console",
  description: "",
};

const inter = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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
          <Navbar />
          <Sidebar />
          <SubjectSelectModal />
          <div className={styles.main}>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
