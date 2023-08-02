"use client";

import OnHoverWrapper from "@/dls/ActionWrapper/OnHoverWrapper";
import IconWrapper from "@/dls/IconWrapper";
import ArrowRectangleIcon from "@/icons/ArrowRectangleIcon";
import { Routes } from "@/types/Routes";
import { logoutUser } from "@/utils/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import useStore from "../../../stores/store";

type Props = {};

const Action = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        toast.success("Logout berhasil");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        queryClient.invalidateQueries();
        queryClient.removeQueries();
        router.push(Routes.Home);
        setUser(null);
        localStorage.removeItem("access-token");
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
