"use client";

import { Routes } from "@/types/Routes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const registerPage = pathname.includes(Routes.Register);
  const loginPage = pathname.includes(Routes.Login);

  // redirect to app if already logged in or has access token
  useEffect(() => {
    const accessToken = window.localStorage.getItem("access-token");

    // redirect if on register or login page, otherwise do nothing
    if (accessToken && (registerPage || loginPage)) {
      router.push(Routes.App);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid place-items-center w-screen h-screen">{children}</div>
  );
};

export default AuthLayout;
