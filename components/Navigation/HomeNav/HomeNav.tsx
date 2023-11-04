"use client";

import Hamburger from "@/dls/Hamburger";
import { Routes } from "@/types/Routes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
        " transition-all duration-300 ease-out z-50",
        {
          "left-1/2 top-10 lg:top-20 w-72 -translate-x-1/2 max-w-xl absolute":
            isInAuthPage,
        },
        {
          "left-0 top-0 max-w-full w-full fixed": isInHomePage,
        }
      )}
    >
      <nav
        className={classNames(
          "items-center flex gap-3",
          { "px-2 py-2 rounded-lg bg-white dark:bg-slate-700": isInAuthPage },
          {
            "px-5 py-5 md:px-10 bg-stone-100 border-b dark:bg-slate-800 dark:border-slate-700":
              isInHomePage,
          }
        )}
      >
        {isInHomePage ? (
          <Link
            href={Routes.Home}
            className="mr-3 flex-1 lg:text-xl text-lg text-stone-700 dark:text-slate-200 font-bold"
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
              "md:flex items-center absolute md:static w-full md:w-fit left-0 top-14 py-2 px-3 md:py-0 md:px-0 transition-all md:bg-none shadow-lg shadow-neutral-600/10  dark:bg-slate-8 00 dark:shadow-slate-800/50 md:shadow-none md:visible overflow-hidden gap-8":
                isInHomePage,
              "flex gap-3": isInAuthPage,
            },

            {
              "visible max-h-44 bg-inherit": isOpen,
            },
            {
              "space-y-4 md:space-y-0 border-b dark:border-slate-700":
                isInHomePage && isOpen,
            },
            {
              "invisible md:visible md:max-h-16 max-h-0":
                !isOpen && isInHomePage,
            }
          )}
        >
          <HomeNavLink
            isActive={pathname === Routes.Demo}
            href={Routes.Demo}
            className={classNames(
              "w-full font-medium bg-gradient-to-r from-sky-500 to-blue-500 !text-white md:mb-0 mb-5",
              { hidden: isInAuthPage }
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
