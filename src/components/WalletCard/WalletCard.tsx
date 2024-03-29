import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import { updateWalletColor } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { WalletColor, walletColors } from "./constants";
import WalletCardDropdown from "./WalletCardDropdown";

type Props = {
  id: string;
  isDefault?: boolean;
  initColorKey: WalletColor;
  name: string;
  balance: number;
  link?: string;
  isCredit: boolean;
  demoMode?: boolean;
};

const WalletCard = ({
  id,
  isDefault = true,
  initColorKey,
  name,
  balance,
  isCredit,
  demoMode = false,
}: Props) => {
  const [colorKey, setColorKey] = useState<string>(initColorKey);

  const queryClient = useQueryClient();
  const colorMutation = useMutation({
    mutationFn: updateWalletColor,
    onSuccess: (data) => {
      // update colorKey in cache
      queryClient.setQueryData([QueryKey.WALLETS], (oldData: any) => {
        return oldData.map((wallet: WalletData) => {
          if (wallet._id === id) {
            return { ...wallet, color: data.color };
          }
          return wallet;
        });
      });

      // update single wallet color in cache
      if (queryClient.getQueryData([QueryKey.WALLETS, id])) {
        queryClient.setQueryData([QueryKey.WALLETS, id], (oldData: any) => {
          return { ...oldData, color: data.color };
        });
      }
    },
    onError: () => {
      // reset colorKey to initColorKey
      setColorKey(initColorKey);
    },
  });

  const handleUpdateColor = () => {
    // if colorKey is not changed, do nothing
    if (colorKey === initColorKey) return;
    colorMutation.mutate({ id, color: colorKey });
  };

  return (
    <div
      className={classNames(
        "rounded-xl p-5 bg-gradient-to-br group flex flex-col gap-10 transition-all ",
        !colorKey.includes("#") && walletColors[colorKey as WalletColor]
      )}
      style={{
        backgroundColor: colorKey.includes("#") ? colorKey : undefined,
      }}
    >
      <div className="flex items-center gap-5">
        <Link
          href={demoMode ? `/demo/wallet/${id}` : `/app/wallet/${id}`}
          className={classNames(
            "px-3 py-1  w-fit rounded-lg font-semibold text-white cursor-pointer",
            { "bg-slate-200/30": isDefault }
          )}
        >
          {name}
        </Link>
        <WalletCardDropdown
          id={id}
          handleUpdateColor={handleUpdateColor}
          setColorKey={setColorKey}
          colorKey={colorKey}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-white">Saldo {isCredit && "minus"}</div>
          <div className="text-xl md:text-2xl font-semibold text-white">
            {isCredit && "-"}
            {currencyFormat(balance)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
