"use client";

import Hamburger from "@/dls/Hamburger";
import Heading from "@/dls/Heading";
import { Routes } from "@/types/Routes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ThemeToggleIcon from "../../ThemeSelection/ThemeToggleIcon";
import HomeNavLink from "./HomeNavLink";

type Props = {};

const HomeNav = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isInHomePage = pathname === "/" && !pathname?.includes("auth");
  const isInAuthPage = pathname?.includes("auth");

  if (pathname?.includes("app") || pathname?.includes("demo")) return <></>;
  return (
    <header
      className={classNames(
        " transition-all duration-300 ease-out fixed z-50",
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
          "items-center flex gap-3 bg-white shadow-lg shadow-neutral-600/10 rounded-b-lg dark:bg-slate-600 dark:shadow-slate-800/50",
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

        <div
          className={classNames(
            {
              "md:flex items-center absolute md:static w-full md:w-fit left-0 top-14 py-2 px-3 md:py-0 md:px-0 transition-all bg-white md:bg-none shadow-lg shadow-neutral-600/10 rounded-b-lg dark:bg-slate-600 dark:shadow-slate-800/50 md:shadow-none md:visible overflow-hidden gap-8":
                isInHomePage,
              "flex gap-3": isInAuthPage,
            },

            { "visible max-h-44": isOpen },
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
          <HomeNavLink
            isActive={pathname === Routes.Login}
            href={Routes.Login}
            className=""
          >
            Login
          </HomeNavLink>
          <HomeNavLink
            isActive={pathname === Routes.Register}
            href={Routes.Register}
            type={isInAuthPage ? "primary" : "secondary"}
            className=""
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
