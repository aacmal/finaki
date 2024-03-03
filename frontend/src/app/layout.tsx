import { Inter } from "@next/font/google";
import classNames from "classnames";
import "./globals.scss";
import HomeNav from "../components/Navigation/HomeNav/HomeNav";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "../components/Analytics/ga";
import RQProvider from "./provider";
import * as Seo from "./seo";

// font set up
const font = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://finaki.acml.me/"),
  title: "Finkai",
  keywords: Seo.keywords,
  description: Seo.desciprtion,
  manifest: "/app.webmanifest",
  openGraph: {
    title: Seo.title,
    description: Seo.desciprtion,
  },
  twitter: {
    title: Seo.title,
    description: Seo.desciprtion,
  },
};

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
      <head>
        {/* theme color */}
        <meta name="theme-color" content="#e7e5e4" />
      </head>
      <body
        className={classNames("bg-stone-100 dark:bg-slate-800", font.className)}
      >
        <RQProvider>
          <Toaster />
          <HomeNav />
          <main>{children}</main>
        </RQProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
