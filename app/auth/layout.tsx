"use client";

import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import GetUserData from "../GetUserData";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { isSuccess, isLoading } = useQuery({ queryKey: [QueryKey.USER] });
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
      {children}
    </div>
  );
};

export default AuthLayout;
