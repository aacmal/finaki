"use client";

import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import GetUserData from "../GetUserData";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { isSuccess } = useQuery([QueryKey.USER]);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.App);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="grid place-items-center w-screen h-screen">
      <GetUserData />
      <div className="max-w-6xl w-[90%] lg:h-[60%] h-fit p-4 bg-white dark:bg-slate-600  dark:shadow-slate-800 rounded-2xl shadow-2xl shadow-slate-200">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
