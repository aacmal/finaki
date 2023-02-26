import IconButton from "@/dls/IconButton";
import ArrowsIcon from "@/icons/ArrowsIcon";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PlusIcon from "@/icons/PlusIcon";
import { useCallback } from "react";
import useStore from "../../stores/store";
import { WalletData } from "@/types/Wallet";

type Props = {
  walletData: WalletData;
};

const WalletOption = ({ walletData }: Props) => {
  const { setSourceWalletId, setOpen } = useStore(
    (state) => state.transferBalanceState
  );

  const handleTransferBalance = useCallback(() => {
    setOpen(true);
    setSourceWalletId(walletData._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center gap-4 mt-3">
      <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
        <PlusIcon strokeWidth={2} />
      </IconButton>
      <IconButton
        onClick={handleTransferBalance}
        shape="circle"
        className="bg-white/40 text-slate-50 !p-2"
      >
        <ArrowsIcon strokeWidth={0.5} fill="currentColor" />
      </IconButton>
      <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
        <ElipsisVerticalIcon strokeWidth={3} className=" transform rotate-90" />
      </IconButton>
    </div>
  );
};

export default WalletOption;
