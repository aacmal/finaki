import IconWrapper from "@/dls/IconWrapper";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import classNames from "classnames";
import React from "react";
import { WalletColor, walletColors } from "./constants";
import WalletCardDropdown from "./WalletCardDropdown";

type Props = {
  isDefault?: boolean;
  color: WalletColor;
  name: string;
  balance: number;
  link?: string;
};

const WalletCard = ({ isDefault, color, name, balance, link }: Props) => {
  const totalBalance = balance.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div
      className={classNames(
        "rounded-xl p-5 bg-gradient-to-br group flex flex-col gap-10",
        walletColors[color]
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={classNames(
            "px-3 py-1  w-fit rounded-lg font-semibold text-white cursor-pointer",
            { "bg-slate-200/30": isDefault }
          )}
        >
          {name}
        </div>
        <WalletCardDropdown colorKey={color} />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-white">Saldo</div>
          <div className="text-xl md:text-2xl font-semibold text-white">
            {totalBalance}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
