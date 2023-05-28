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
import { IoIosColorPalette } from "react-icons/io";
import TrashIcon from "@/icons/TrashIcon";
import { useRef } from "react";
import useStore from "../../stores/store";
import { hashCodeColor, indicatorColor, WalletColor } from "./constants";

type Props = {
  id: string;
  colorKey: string;
  handleUpdateColor: () => void;
  setColorKey: (color: string) => void;
};

const ButtonTrigger = () => (
  <button className="text-white w-6 hover:bg-slate-300/30 rounded cursor-pointer lg:hidden block group-hover:block">
    <ElipsisVerticalIcon />
  </button>
);

export const ColorCircle = ({ style }: { style?: React.CSSProperties }) => (
  <div style={style} className={"w-3 h-3 rounded-full"}></div>
);

const SubMenuTrigger = () => (
  <div className="flex items-center justify-between">
    Ganti warna
    <IconWrapper className="!w-4 transform -rotate-90">
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
  const colorRef = useRef<HTMLInputElement>(null);

  const updateWhenClose = (isOpen: boolean) => {
    if (!isOpen) {
      handleUpdateColor();
    }
  };
  const isCustomColor = colorKey.includes("#");

  return (
    <DropdownMenu onOpenChange={updateWhenClose} trigger={<ButtonTrigger />}>
      {/* <DropdownItem icon={<PencilIcon />}>Ubah nama dompet</DropdownItem>
      <DropdownCheckboxItem shouldCloseAfterClick checked={false}>
        Jadikan dompet utama
      </DropdownCheckboxItem> */}
      <DropdownSubMenu
        trigger={<SubMenuTrigger />}
        iconTrigger={
          <ColorCircle
            style={{
              backgroundColor: isCustomColor
                ? colorKey
                : indicatorColor[colorKey as WalletColor],
            }}
          />
        }
      >
        {Object.keys(indicatorColor).map((key: string) => (
          <DropdownItem
            onClick={() => setColorKey(key as WalletColor)}
            key={key}
            icon={
              <ColorCircle
                style={{
                  backgroundColor: indicatorColor[key as WalletColor],
                }}
              />
            }
          >
            {key}
          </DropdownItem>
        ))}
        <DropdownItem
          icon={<IoIosColorPalette />}
          onClick={() => colorRef.current?.click()}
        >
          Custom color
        </DropdownItem>
      </DropdownSubMenu>
      <input
        value={
          isCustomColor ? colorKey : hashCodeColor[colorKey as WalletColor]
        }
        ref={colorRef}
        onChange={(e) => setColorKey(e.currentTarget.value)}
        className="sr-only"
        type="color"
      />
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
