"use client";
import {
  DropdownCheckboxItem,
  DropdownItem,
} from "@/dls/Dropdown/DropdownItem";
import DropdownMenu from "@/dls/Dropdown/DropdownMenu";
import DropdownSubMenu from "@/dls/Dropdown/DropdownSubMenu";
import IconWrapper from "@/dls/IconWrapper";
import ChevronIcon from "@/icons/ChevronIcon";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PencilIcon from "@/icons/PencilIcon";
import TrashIcon from "@/icons/TrashIcon";
import useStore from "../../stores/store";
import { indicatorColor, WalletColor } from "./constants";

type Props = {
  id: string;
  colorKey: WalletColor;
  handleUpdateColor: () => void;
  setColorKey: (color: WalletColor) => void;
};

const ButtonTrigger = () => (
  <button className="text-white w-6 hover:bg-slate-300/30 rounded cursor-pointer lg:hidden block group-hover:block">
    <ElipsisVerticalIcon />
  </button>
);

export const ColorCircle = ({ dataColor }: { dataColor: string }) => (
  <div className={`w-3 h-3 rounded-full ${dataColor}`}></div>
);

const SubMenuTrigger = () => (
  <div className="flex items-center justify-between">
    Ganti warna
    <IconWrapper className="w-4 transform -rotate-90">
      <ChevronIcon />
    </IconWrapper>
  </div>
);

const WalletCardDropdown = ({
  colorKey,
  id,
  handleUpdateColor,
  setColorKey,
}: Props) => {
  const setDeleteWalletId = useStore((state) => state.setDeleteWalletId);

  const updateWhenClose = (isOpen: boolean) => {
    if (!isOpen) {
      handleUpdateColor();
    }
  };

  return (
    <DropdownMenu onOpenChange={updateWhenClose} trigger={<ButtonTrigger />}>
      {/* <DropdownItem icon={<PencilIcon />}>Ubah nama dompet</DropdownItem>
      <DropdownCheckboxItem shouldCloseAfterClick checked={false}>
        Jadikan dompet utama
      </DropdownCheckboxItem> */}
      <DropdownSubMenu
        trigger={<SubMenuTrigger />}
        iconTrigger={<ColorCircle dataColor={indicatorColor[colorKey]} />}
      >
        {Object.keys(indicatorColor).map((key: string) => (
          <DropdownItem
            onClick={() => setColorKey(key as WalletColor)}
            key={key}
            icon={<ColorCircle dataColor={(indicatorColor as any)[key]} />}
          >
            {key}
          </DropdownItem>
        ))}
      </DropdownSubMenu>
      <DropdownItem
        shouldCloseAfterClick
        className="hover:!bg-red-400 hover:!text-white"
        icon={<TrashIcon />}
        onClick={() => setDeleteWalletId(id)}
      >
        Hapus dompet
      </DropdownItem>
    </DropdownMenu>
  );
};

export default WalletCardDropdown;
