"use client";

import Placeholder from "../../../components/Placeholder";
import AddNewWallet from "../../../components/WalletCard/AddNewWallet";
import WalletCard from "../../../components/WalletCard/WalletCard";
import WalletCardSkeleton from "../../../components/WalletCard/WalletCardSkeleton";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";

const AllWalletsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: (): Promise<WalletData[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/wallet.json").then((data) => {
          resolve(data.data as WalletData[]);
        });
      }),
  });

  if (isLoading || !data) {
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
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const totalBalance = data.reduce(
    (acc: number, curr: any) => acc + curr.balance,
    0
  );

  return (
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
        {data.map((wallet: any) => (
          <WalletCard
            key={wallet._id}
            id={wallet._id}
            name={wallet.name}
            initColorKey={wallet.color}
            balance={wallet.balance}
            isCredit={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AllWalletsPage;
