"use client";

import OnHoverWrapper from "../../dls/ActionWrapper/OnHoverWrapper";
import IconWrapper from "../../dls/IconWrapper";
import ArrowRectangleIcon from "../../icons/ArrowRectangleIcon";
import { Routes } from "@/types/Routes";
import { logoutUser } from "@/utils/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useStore from "../../../stores/store";

const Action = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logout berhasil");
      })
      .catch(() => {
        toast.error("Ada kesalahan saat logout");
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
