import IconButton from "../dls/IconButton";
import ArrowsIcon from "../icons/ArrowsIcon";
import ElipsisVerticalIcon from "../icons/ElipsisVerticalIcon";
import PlusIcon from "../icons/PlusIcon";
import { useCallback } from "react";
import useStore from "../../stores/store";
import { WalletData } from "@/types/Wallet";
import DropdownMenu from "../dls/Dropdown/DropdownMenu";
import { DropdownItem } from "../dls/Dropdown/DropdownItem";
import PencilIcon from "../icons/PencilIcon";
import TrashIcon from "../icons/TrashIcon";
import XmarkIcon from "../icons/XmarkIcon";
import CheckIcon from "../icons/CheckIcon";

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
      <div className="flex justify-center gap-4 mt-3">
        <IconButton
          onClick={() => state.setEdit(false)}
          shape="circle"
          className="bg-white/40 text-slate-50 !p-2"
        >
          <XmarkIcon />
        </IconButton>
        <IconButton
          type="submit"
          form="edit-wallet-form"
          shape="circle"
          className="bg-white/40 text-slate-50 !p-2"
        >
          <CheckIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 mt-3">
      <IconButton
        onClick={() => setWalletId(walletData._id)}
        shape="circle"
        className="bg-white/40 text-slate-50 !p-2"
      >
        <PlusIcon strokeWidth={2} />
      </IconButton>
      <IconButton
        onClick={handleTransferBalance}
        shape="circle"
        className="bg-white/40 text-slate-50 !p-2"
      >
        <ArrowsIcon strokeWidth={0.5} fill="currentColor" />
      </IconButton>
      <DropdownMenu
        sideOffset={5}
        align="start"
        trigger={
          <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
            <ElipsisVerticalIcon
              strokeWidth={3}
              className=" transform rotate-90"
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
