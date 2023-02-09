"use client";

import AddNewWallet from "@/components/WalletCard/AddNewWallet";
import WalletCard from "@/components/WalletCard/WalletCard";
import Button from "@/dls/Button/Button";
import Heading from "@/dls/Heading";
import { getAllWallets } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const AllWalletsPage = (props: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getAllWallets,
    onSuccess: (data) => {
      console.log("all wallets", data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <Heading level={3}>Mengambil data...</Heading>;
  if (!data) return <Heading level={3}>Terjadi Kesalahan</Heading>;

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
          <div className="text-center">Tidak ada dompet</div>
        )}
        {/* <WalletCard name="Dompet Utama" color="red" balance={1000000} />
        <WalletCard name="Tunai" color="orange" balance={1000000} />
        <WalletCard name="BCA" color="green" balance={1000000} />
        <WalletCard name="OVO" color="purple" balance={1000000} isDefault /> */}
      </div>
    </div>
  );
};

export default AllWalletsPage;
