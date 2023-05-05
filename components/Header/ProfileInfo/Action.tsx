"use client";

import OnHoverWrapper from "@/dls/ActionWrapper/OnHoverWrapper";
import IconWrapper from "@/dls/IconWrapper";
import ArrowRectangleIcon from "@/icons/ArrowRectangleIcon";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { logoutUser } from "@/utils/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
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
        queryClient.removeQueries();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <OnHoverWrapper>
      <span
        role="button"
        onClick={handleLogout}
        className="py-2 px-4 hover:bg-red-500 hover:text-white flex items-center gap-5"
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
