"use client";

import { usePathname } from "next/navigation";

import ArrowsIcon from "@/icons/ArrowsIcon";
import GridIcon from "@/icons/GridIcon";
import UserIcon from "@/icons/UserIcon";
import WalletIcon from "@/icons/WalletIcon";
import { defaultIconProps } from "@/types/IconProps";
import { Routes } from "@/types/Routes";
import AppNavLink from "./AppNavLink";

const DemoNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around lg:justify-start lg:flex-col gap-4 h-fit fixed lg:sticky lg:top-4 bottom-0 p-3 lg:p-0 shadow-2xl lg:shadow-none shadow-gray-700 bg-white dark:bg-slate-700 z-50 left-0 w-screen lg:w-fit lg:mt-20 lg:bg-transparent dark:lg:bg-transparent">
      <AppNavLink
        icon={<GridIcon {...defaultIconProps} />}
        href={Routes.DashboardDemo}
        active={pathname === Routes.DashboardDemo}
      >
        Dashboard
      </AppNavLink>
      <AppNavLink
        icon={<WalletIcon {...defaultIconProps} />}
        href={Routes.WalletDemo}
        active={pathname?.includes(Routes.WalletDemo)}
      >
        Dompet
      </AppNavLink>
      <AppNavLink
        icon={<ArrowsIcon {...defaultIconProps} />}
        href={Routes.TransactionsDemo}
        active={pathname === Routes.TransactionsDemo}
      >
        Transaksi
      </AppNavLink>
      <AppNavLink
        icon={<UserIcon {...defaultIconProps} />}
        href={Routes.AccountDemo}
        active={pathname === Routes.AccountDemo}
      >
        Akun Saya
      </AppNavLink>
    </nav>
  );
};

export default DemoNav;
