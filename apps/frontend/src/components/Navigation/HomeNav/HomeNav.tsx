"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Routes } from "@/types/Routes";
import classNames from "classnames";

import Hamburger from "../../dls/Hamburger";
import ThemeToggleIcon from "../../ThemeSelection/ThemeToggleIcon";
import HomeNavLink from "./HomeNavLink";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isInHomePage =
    !pathname?.includes("auth") &&
    (pathname?.includes("about") || pathname === "/");

  const isInAuthPage = pathname?.includes("auth");

  // hide nav in app and demo pages
  if (pathname?.includes("app") || pathname?.includes("demo")) return <></>;

  return (
    <header
      className={classNames(
        " z-50 transition-all duration-300 ease-out",
        {
          "absolute left-1/2 top-10 w-72 max-w-xl -translate-x-1/2 lg:top-20":
            isInAuthPage,
        },
        {
          "fixed left-0 top-0 w-full max-w-full": isInHomePage,
        },
      )}
    >
      <nav
        className={classNames(
          "flex items-center gap-3",
          { "rounded-lg bg-white px-2 py-2 dark:bg-slate-700": isInAuthPage },
          {
            "border-b bg-stone-100 px-5 py-5 dark:border-slate-700 dark:bg-slate-800 md:px-10":
              isInHomePage,
          },
        )}
      >
        {isInHomePage ? (
          <Link
            href={Routes.Home}
            className="mr-3 flex-1 text-lg font-bold text-stone-700 dark:text-slate-200 lg:text-xl"
          >
            Finaki
          </Link>
        ) : (
          <HomeNavLink isActive={pathname === Routes.Home} href={Routes.Home}>
            Home
          </HomeNavLink>
        )}

        <div
          className={classNames(
            {
              "dark:bg-slate-8 00 absolute left-0 top-14 w-full items-center gap-8 overflow-hidden px-3 py-2 shadow-lg shadow-neutral-600/10 transition-all dark:shadow-slate-800/50 md:visible  md:static md:flex md:w-fit md:bg-none md:px-0 md:py-0 md:shadow-none":
                isInHomePage,
              "flex gap-3": isInAuthPage,
            },

            {
              "visible max-h-44 bg-inherit": isOpen,
            },
            {
              "space-y-4 border-b dark:border-slate-700 md:space-y-0":
                isInHomePage && isOpen,
            },
            {
              "invisible max-h-0 md:visible md:max-h-16":
                !isOpen && isInHomePage,
            },
          )}
        >
          <HomeNavLink
            isActive={pathname === Routes.Demo}
            href={Routes.Demo}
            className={classNames(
              "mb-5 w-full bg-gradient-to-r from-sky-500 to-blue-500 font-medium !text-white md:mb-0",
              { hidden: isInAuthPage },
            )}
          >
            Demo
          </HomeNavLink>
          <HomeNavLink isActive={pathname === Routes.Login} href={Routes.Login}>
            Login
          </HomeNavLink>
          <HomeNavLink
            isActive={pathname === Routes.Register}
            href={Routes.Register}
            type={isInAuthPage ? "primary" : "secondary"}
          >
            Register
          </HomeNavLink>
        </div>
        {isInHomePage && (
          <>
            <ThemeToggleIcon />
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={classNames("md:hidden", { hidden: isInAuthPage })}
            >
              <Hamburger isOpen={isOpen} />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default HomeNav;
