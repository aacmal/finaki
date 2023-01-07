"use client";

import { Inter } from "@next/font/google";
import classNames from "classnames";
import "./globals.scss";
import Navigation from "@/components/Navbar/Navigation";
import useTheme from "../hooks/useTheme";

// font set up
const font = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={classNames("bg-stone-100 dark:bg-slate-800", font.className)}
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
