"use client";

import { usePathname } from "next/navigation";

import GridIcon from "@/icons/GridIcon";
import ArrowsIcon from "@/icons/ArrowsIcon";
import GearIcon from "@/icons/GearIcon";
import WalletIcon from "@/icons/WalletIcon";
import { defaultIconProps } from "@/types/IconProps";
import { Routes } from "@/types/Routes";
import AppNavLink from "./AppNavLink";

type Props = {};

const AppNav = (props: Props) => {
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
        Wallet
      </AppNavLink>
      <AppNavLink
        icon={<ArrowsIcon {...defaultIconProps} />}
        href={Routes.Transactions}
        active={pathname === Routes.Transactions}
      >
        Transactions
      </AppNavLink>
      <AppNavLink
        icon={<GearIcon {...defaultIconProps} />}
        href={Routes.Settings}
        active={pathname === Routes.Settings}
      >
        Settings
      </AppNavLink>
    </nav>
  );
};

export default AppNav;
