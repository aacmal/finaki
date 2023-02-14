"use client";

import OnHoverWrapper from "@/dls/ActionWrapper/OnHoverWrapper";
import IconWrapper from "@/dls/IconWrapper";
import ArrowRectangleIcon from "@/icons/ArrowRectangleIcon";
import UserIcon from "@/icons/UserIcon";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { logoutUser } from "@/utils/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useStore from "../../../stores/store";

type Props = {};

const Action = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        setUser(null);
        localStorage.removeItem("access-token");
        router.push(Routes.Home);
        queryClient.invalidateQueries();
        queryClient.removeQueries([QueryKey.USER]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <OnHoverWrapper>
      <Link
        href={Routes.Profile}
        className="py-2 px-4 hover:bg-gray-200 flex items-center gap-5"
      >
        <IconWrapper>
          <UserIcon />
        </IconWrapper>
        <span className=" whitespace-nowrap">Akun saya</span>
      </Link>
      <span
        role="button"
        onClick={handleLogout}
        className="py-2 px-4 hover:bg-gray-200 flex items-center gap-5"
      >
        <IconWrapper>
          <ArrowRectangleIcon />
        </IconWrapper>
        <span className=" whitespace-nowrap">Log out</span>
      </span>
    </OnHoverWrapper>
  );
};

export default Action;
