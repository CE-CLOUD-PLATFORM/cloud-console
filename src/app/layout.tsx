"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navigator/Navbar";
import Sidebar from "../components/Navigator/Sidebar";
import styles from "./page.module.css";
import UserProvider from "@/contexts/UserContext";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
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
      <head>
        <script src="https://unpkg.com/flowbite@latest/dist/flowbite.min.js"></script>
      </head>
      <body className={inter.className}>
          <UserProvider>
            <Navbar />
            <Sidebar />
            <div className={styles.main}>{children}</div>
          </UserProvider>
      </body>
    </html>
  );
}
