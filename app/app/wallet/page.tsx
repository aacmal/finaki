"use client";

import Placeholder from "@/components/Placeholder";
import AddNewWallet from "@/components/WalletCard/AddNewWallet";
import DeleteWalletDialog from "@/components/WalletCard/DeleteWalletDialog";
import DeleteWallet from "@/components/WalletCard/DeleteWalletDialog";
import WalletCard from "@/components/WalletCard/WalletCard";
import WalletCardSkeleton from "@/components/WalletCard/WalletCardSkeleton";
import Button from "@/dls/Button/Button";
import Heading from "@/dls/Heading";
import { QueryKey } from "@/types/QueryKey";
import { getAllWallets } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const AllWalletsPage = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
    onSuccess: (data) => {},
  });

  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-semibold text-stone-700 dark:text-slate-200">
              <span className="text-center md:text-left block w-full">
                Total saldo
              </span>
              <Placeholder className="w-44 h-12 mt-1" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-5">
            <WalletCardSkeleton />
          </div>
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <Heading className="text-center mt-10" level={3}>
        Terjadi Kesalahan
        <span>{(error as any).response.data.message}</span>
      </Heading>
    );
  }

  const totalBalance = data.reduce(
    (acc: number, curr: any) => acc + curr.balance,
    0
  );

  return (
    <>
      <div className="mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-semibold text-stone-700 dark:text-slate-200">
            <span className="text-center md:text-left block w-full">
              Total saldo
            </span>
            <span className="text-2xl">{currencyFormat(totalBalance)}</span>
          </div>
          <AddNewWallet />
        </div>
        <div className="mt-6 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-5">
          {data.length > 0 ? (
            data.map((wallet: any) => (
              <WalletCard
                key={wallet._id}
                id={wallet._id}
                name={wallet.name}
                initColorKey={wallet.color}
                balance={wallet.balance}
              />
            ))
          ) : (
            <div className="text-center dark:text-slate-50">
              Tidak ada dompet
            </div>
          )}
        </div>
      </div>
      <DeleteWalletDialog />
    </>
  );
};

export default AllWalletsPage;
