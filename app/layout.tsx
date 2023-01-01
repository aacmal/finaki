import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "@next/font/google";
import classNames from "classnames";
import "./globals.scss";

// font set up
const font = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={classNames("bg-gray-100", font.className)}>
        {children}
      </body>
    </html>
  );
}
