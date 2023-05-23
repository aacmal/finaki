"use client";

import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import TransferBalanceDialog from "@/components/WalletCard/TransferBalanceDialog";
import TransactionDetail from "@/components/Transactions/TransactionDetail";
import DeleteWalletDialog from "@/components/WalletCard/DeleteWalletDialog";
import AddTransaction from "@/components/Transactions/AddTransaction";
import DemoNav from "@/components/Navigation/AppNav/DemoNav";
import Link from "next/link";
import { Routes } from "@/types/Routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey";
import { getUserData } from "@/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full p-1 text-center bg-gradient-to-r from-blue-600 to-violet-700 text-white z-[9] lg:text-base text-sm">
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
