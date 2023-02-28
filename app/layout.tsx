"use client";

import { Inter } from "@next/font/google";
import classNames from "classnames";
import "./globals.scss";
import useTheme from "../hooks/useTheme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomeNav from "@/components/Navigation/HomeNav/HomeNav";
import { Toaster } from "react-hot-toast";

// font set up
const font = Inter({
  subsets: ["latin"],
});

// react query set up
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
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
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <HomeNav />
          <main>{children}</main>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
