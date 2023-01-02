"use client";

import Heading from "@/dls/Heading";
import { Routes } from "@/types/Routes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ThemeToggleIcon from "../ThemeSelection/ThemeToogleIcon";
import NavigationLink from "./NavigationLink";

type Props = {};

const Navigation = (props: Props) => {
  const pathname = usePathname();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const isInHomePage = pathname === "/" && !pathname?.includes("auth");
  const isInAuthPage = pathname?.includes("auth");
  console.log(pathname);

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
          "items-center flex gap-3 bg-white shadow-lg rounded-lg",
          { "px-2 py-2 ": isInAuthPage },
          { "px-5 py-5 md:px-10 ": isInHomePage }
        )}
      >
        {isInHomePage ? (
          <Heading level={1} className="mr-3 flex-1">
            Finaki
          </Heading>
        ) : (
          <NavigationLink
            isActive={pathname === Routes.Home}
            href={Routes.Home}
          >
            Home
          </NavigationLink>
        )}
        <div>
          {isUserLoggedIn ? (
            <NavigationLink
              isActive={pathname === Routes.Dashboard}
              href={Routes.Dashboard}
            >
              Dashboard
            </NavigationLink>
          ) : (
            <>
              <NavigationLink
                isActive={pathname === Routes.Login}
                href={Routes.Login}
              >
                Login
              </NavigationLink>
              <NavigationLink
                isActive={pathname === Routes.Register}
                href={Routes.Register}
                type={isInAuthPage ? "primary" : "secondary"}
                className="ml-3"
              >
                Register
              </NavigationLink>
            </>
          )}
        </div>
        {isInHomePage && <ThemeToggleIcon />}
      </nav>
    </header>
  );
};

export default Navigation;
