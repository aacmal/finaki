"use client";

import Heading from "@/dls/Heading";
import { Routes } from "@/types/Routes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useStore from "../../../stores/store";
import ThemeToggleIcon from "../../ThemeSelection/ThemeToggleIcon";
import HomeNavLink from "./HomeNavLink";

type Props = {};

const HomeNav = (props: Props) => {
  const pathname = usePathname();
  const user = useStore((state) => state.user);
  const isInHomePage = pathname === "/" && !pathname?.includes("auth");
  const isInAuthPage = pathname?.includes("auth");

  if (pathname?.includes("app")) return <></>;
  return (
    <header
      className={classNames(
        " transition-all duration-300 ease-out fixed",
        {
          "left-1/2 top-10 lg:top-20 w-72 -translate-x-1/2 max-w-xl":
            isInAuthPage,
        },
        {
          "left-0 top-0 max-w-full w-full": isInHomePage,
        }
      )}
    >
      <nav
        className={classNames(
          "items-center flex gap-3 bg-white shadow-lg shadow-neutral-200/60 rounded-b-lg dark:bg-slate-600 dark:shadow-slate-800",
          { "px-2 py-2 rounded-lg": isInAuthPage },
          { "px-5 py-5 md:px-10 ": isInHomePage }
        )}
      >
        {isInHomePage ? (
          <Heading level={1} className="mr-3 flex-1">
            Finaki
          </Heading>
        ) : (
          <HomeNavLink isActive={pathname === Routes.Home} href={Routes.Home}>
            Home
          </HomeNavLink>
        )}
        <div>
          {user ? (
            <HomeNavLink
              type="secondary"
              isActive={pathname === Routes.Dashboard}
              href={Routes.Dashboard}
            >
              Dashboard
            </HomeNavLink>
          ) : (
            <>
              <HomeNavLink
                isActive={pathname === Routes.Login}
                href={Routes.Login}
              >
                Login
              </HomeNavLink>
              <HomeNavLink
                isActive={pathname === Routes.Register}
                href={Routes.Register}
                type={isInAuthPage ? "primary" : "secondary"}
                className="ml-3"
              >
                Register
              </HomeNavLink>
            </>
          )}
        </div>
        {isInHomePage && <ThemeToggleIcon />}
      </nav>
    </header>
  );
};

export default HomeNav;
