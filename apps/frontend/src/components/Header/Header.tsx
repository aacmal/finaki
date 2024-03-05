"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutSegment } from "@/types/LayoutSegment";

import useStore from "../../stores/store";
import Divider from "../dls/Divider";
import Heading from "../dls/Heading";
import PlusIcon from "../icons/PlusIcon";
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
    <header className="my-4 flex w-full items-center justify-between px-2 lg:px-5">
      <Heading level={1}>{getHeaderTitle(selectedLayout)}</Heading>
      <div className="flex h-full items-center gap-4">
        <div className="fixed bottom-28 right-10 z-20 overflow-hidden rounded-2xl border border-blue-500 bg-white p-3 font-semibold text-blue-500 shadow-xl dark:bg-slate-700 lg:static lg:rounded-lg lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent">
          <div className="cursor-pointer" onClick={() => setOpen(true)}>
            <span className="hidden px-3 py-1 lg:block">Tambah Transaksi</span>
            <div className="w-8 lg:hidden">
              <PlusIcon strokeWidth={2} />
            </div>
          </div>
        </div>
        <Divider className="hidden lg:block" vertical />
        <ProfileInfo />
      </div>
    </header>
  );
};

export default Header;
