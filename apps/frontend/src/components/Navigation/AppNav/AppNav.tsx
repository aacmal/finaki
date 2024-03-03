"use client";

import { usePathname } from "next/navigation";

import ArrowsIcon from "../../icons/ArrowsIcon";
import GridIcon from "../../icons/GridIcon";
import UserIcon from "../../icons/UserIcon";
import WalletIcon from "../../icons/WalletIcon";
import { defaultIconProps } from "@/types/IconProps";
import { Routes } from "@/types/Routes";
import AppNavLink from "./AppNavLink";

const AppNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around lg:justify-start lg:flex-col gap-4 h-fit fixed lg:sticky lg:top-4 bottom-0 p-3 lg:p-0 shadow-2xl lg:shadow-none shadow-gray-700 bg-white dark:bg-slate-700 z-50 left-0 w-screen lg:w-fit lg:mt-20 lg:bg-transparent dark:lg:bg-transparent">
      <AppNavLink
        icon={<GridIcon {...defaultIconProps} />}
        href={Routes.Dashboard}
        active={pathname === Routes.Dashboard}
      >
        Dashboard
      </AppNavLink>
      <AppNavLink
        icon={<WalletIcon {...defaultIconProps} />}
        href={Routes.Wallet}
        active={pathname?.includes(Routes.Wallet)}
      >
        Dompet
      </AppNavLink>
      <AppNavLink
        icon={<ArrowsIcon {...defaultIconProps} />}
        href={Routes.Transactions}
        active={pathname === Routes.Transactions}
      >
        Transaksi
      </AppNavLink>
      <AppNavLink
        icon={<UserIcon {...defaultIconProps} />}
        href={Routes.Account}
        active={pathname === Routes.Account}
      >
        Akun Saya
      </AppNavLink>
    </nav>
  );
};

export default AppNav;
