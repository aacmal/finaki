"use client";

import { usePathname } from "next/navigation";
import { defaultIconProps } from "@/types/IconProps";
import { Routes } from "@/types/Routes";

import ArrowsIcon from "../../icons/ArrowsIcon";
import GridIcon from "../../icons/GridIcon";
import UserIcon from "../../icons/UserIcon";
import WalletIcon from "../../icons/WalletIcon";
import AppNavLink from "./AppNavLink";

const DemoNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-fit w-screen justify-around gap-4 bg-white p-3 shadow-2xl shadow-gray-700 dark:bg-slate-700 lg:sticky lg:top-4 lg:mt-20 lg:w-fit lg:flex-col lg:justify-start lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent">
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
