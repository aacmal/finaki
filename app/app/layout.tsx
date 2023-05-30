"use client";

import { getUserData } from "@/api/user";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import AppNav from "@/components/Navigation/AppNav/AppNav";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../../stores/store";
import TransferBalanceDialog from "@/components/WalletCard/TransferBalanceDialog";
import TransactionDetail from "@/components/Transactions/TransactionDetail";
import DeleteWalletDialog from "@/components/WalletCard/DeleteWalletDialog";
import { getAllTransactions } from "@/api/transaction";
import AddTransaction from "@/components/Transactions/AddTransaction";

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
    <>
      <Container>
        <AppNav />
        <div className="flex flex-col w-full">
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
