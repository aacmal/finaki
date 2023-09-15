"use client";

import Divider from "@/dls/Divider";
import Heading from "@/dls/Heading";
import PlusIcon from "@/icons/PlusIcon";
import { LayoutSegment } from "@/types/LayoutSegment";
import { useSelectedLayoutSegment } from "next/navigation";
import useStore from "../../stores/store";
import ProfileInfo from "./ProfileInfo";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const { setOpen } = useStore((state) => state.addTransactionState);

  const getHeaderTitle = (selectedLayout: string | null) => {
    switch (selectedLayout) {
      case LayoutSegment.DASHBOARD:
        return "Dashboard";
      case LayoutSegment.WALLET:
        return "Dompet";
      case LayoutSegment.TRANSACTIONS:
        return "Transaksi";
      case LayoutSegment.ACCOUNT:
        return "Akun saya";
      default:
        return "";
    }
  };
  return (
    <header className="flex justify-between my-4 items-center w-full px-2 lg:px-5">
      <Heading level={1}>{getHeaderTitle(selectedLayout)}</Heading>
      <div className="flex items-center gap-4 h-full">
        <div className="border border-blue-500 text-blue-500 rounded-2xl lg:bg-transparent dark:lg:bg-transparent dark:bg-slate-700 bg-white lg:shadow-none shadow-xl z-20 overflow-hidden lg:p-0 p-3 lg:rounded-lg font-semibold lg:static fixed bottom-28 right-10">
          <div className="cursor-pointer" onClick={() => setOpen(true)}>
            <span className="lg:block hidden px-3 py-1">Tambah Transaksi</span>
            <div className="w-8 lg:hidden">
              <PlusIcon strokeWidth={2} />
            </div>
          </div>
        </div>
        <Divider className="lg:block hidden" vertical />
        <ProfileInfo />
      </div>
    </header>
  );
};

export default Header;
