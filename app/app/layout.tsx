"use client";

import { getUserData } from "@/api/user";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import AppNav from "@/components/Navigation/AppNav/AppNav";
import { Routes } from "@/types/Routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../../stores/store";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();

  const { isLoading, data, isError } = useQuery(["user"], {
    queryFn: () => getUserData(),
    onError: (error) => {
      console.log("user error", error);
    },
  });

  useEffect(() => {
    if (isError) {
      router.push(Routes.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  if (isLoading || !data) {
    return (
      <div className="h-screen w-screen dark:text-slate-300 grid place-items-center font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Container>
      <AppNav />
      <div className="flex flex-col w-full">
        <Header />
        <main>{children}</main>
      </div>
    </Container>
  );
};

export default AppLayout;
