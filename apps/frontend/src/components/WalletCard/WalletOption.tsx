import { useCallback } from "react";
import { WalletData } from "@/types/Wallet";

import useStore from "../../stores/store";
import { DropdownItem } from "../dls/Dropdown/DropdownItem";
import DropdownMenu from "../dls/Dropdown/DropdownMenu";
import IconButton from "../dls/IconButton";
import ArrowsIcon from "../icons/ArrowsIcon";
import CheckIcon from "../icons/CheckIcon";
import ElipsisVerticalIcon from "../icons/ElipsisVerticalIcon";
import PencilIcon from "../icons/PencilIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import XmarkIcon from "../icons/XmarkIcon";

type Props = {
  walletData: WalletData;
  state: any;
};

const WalletOption = ({ walletData, state }: Props) => {
  const { setSourceWalletId, setOpen, setDeleteWalletId, setWalletId } =
    useStore((state) => ({
      setSourceWalletId: state.transferBalanceState.setSourceWalletId,
      setOpen: state.transferBalanceState.setOpen,
      setDeleteWalletId: state.setDeleteWalletId,
      setWalletId: state.addTransactionState.setWalletId,
    }));

  const handleTransferBalance = useCallback(() => {
    setOpen(true);
    setSourceWalletId(walletData._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.edit) {
    return (
      <div className="mt-3 flex justify-center gap-4">
        <IconButton
          onClick={() => state.setEdit(false)}
          shape="circle"
          className="bg-white/40 !p-2 text-slate-50"
        >
          <XmarkIcon />
        </IconButton>
        <IconButton
          type="submit"
          form="edit-wallet-form"
          shape="circle"
          className="bg-white/40 !p-2 text-slate-50"
        >
          <CheckIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="mt-3 flex justify-center gap-4">
      <IconButton
        onClick={() => setWalletId(walletData._id)}
        shape="circle"
        className="bg-white/40 !p-2 text-slate-50"
      >
        <PlusIcon strokeWidth={2} />
      </IconButton>
      <IconButton
        onClick={handleTransferBalance}
        shape="circle"
        className="bg-white/40 !p-2 text-slate-50"
      >
        <ArrowsIcon strokeWidth={0.5} fill="currentColor" />
      </IconButton>
      <DropdownMenu
        sideOffset={5}
        align="start"
        trigger={
          <IconButton shape="circle" className="bg-white/40 !p-2 text-slate-50">
            <ElipsisVerticalIcon
              strokeWidth={3}
              className=" rotate-90 transform"
            />
          </IconButton>
        }
      >
        <DropdownItem
          shouldCloseAfterClick
          onClick={() => state.setEdit(true)}
          icon={<PencilIcon />}
        >
          Edit Dompet
        </DropdownItem>
        <DropdownItem
          shouldCloseAfterClick
          className="hover:!bg-red-400 hover:!text-white"
          icon={<TrashIcon />}
          onClick={() => setDeleteWalletId(walletData._id)}
        >
          Hapus dompet
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default WalletOption;
