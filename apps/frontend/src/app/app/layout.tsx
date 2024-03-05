"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/api/user";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import AppNav from "../../components/Navigation/AppNav/AppNav";
import AddTransaction from "../../components/Transactions/AddTransaction";
import TransactionDetail from "../../components/Transactions/TransactionDetail";
import DeleteWalletDialog from "../../components/WalletCard/DeleteWalletDialog";
import TransferBalanceDialog from "../../components/WalletCard/TransferBalanceDialog";
import useStore from "../../stores/store";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();

  const { isLoading, data, isError } = useQuery({
    queryKey: [QueryKey.USER],
    queryFn: getUserData,
    onSuccess: (data) => {
      setUser(data);
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (isError) {
      router.push(Routes.Login);

      // remove access token if error
      window.localStorage.removeItem("access-token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  if (isLoading || !data) {
    return (
      <div className="grid h-screen w-screen place-items-center font-semibold dark:text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Container>
        <AppNav />
        <div className="flex w-full flex-col">
          <Header />
          <main>{children}</main>
        </div>
      </Container>
      <DeleteWalletDialog />
      <TransferBalanceDialog />
      <TransactionDetail />
      <AddTransaction />
    </>
  );
};

export default AppLayout;
