"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserData } from "@/api/user";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import DemoNav from "../../components/Navigation/AppNav/DemoNav";
import AddTransaction from "../../components/Transactions/AddTransaction";
import TransactionDetail from "../../components/Transactions/TransactionDetail";
import DeleteWalletDialog from "../../components/WalletCard/DeleteWalletDialog";
import TransferBalanceDialog from "../../components/WalletCard/TransferBalanceDialog";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  useQuery({
    queryKey: [QueryKey.USER],
    queryFn: getUserData,
    onSuccess: () => {
      router.push(Routes.App);
    },
    staleTime: 0,
  });

  useEffect(() => {
    document.title = "Demo";
    return () => {
      queryClient.removeQueries();
      document.title = "Finaki";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[9] w-full bg-gradient-to-r from-blue-600 to-violet-700 p-1 text-center text-sm text-white lg:text-base">
        Sekarang ini anda sedang dalam akun Demo
        <Link
          className="mx-2 font-semibold text-white underline"
          href={Routes.Register}
        >
          Daftar Sekarang
        </Link>
        Untuk menggunakan seluruh fitur
      </div>
      <Container className="pt-14 lg:pt-10">
        <DemoNav />
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
