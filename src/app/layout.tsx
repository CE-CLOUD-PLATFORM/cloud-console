import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigator/Navbar";
import Sidebar from "./components/Navigator/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CE Cloud Console",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/flowbite@latest/dist/flowbite.min.js"></script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
