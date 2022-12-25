import OnHoverWrapper from "@/dls/ActionWrapper/OnHoverWrapper";
import IconWrapper from "@/dls/IconWrapper";
import ArrowRectangleIcon from "@/icons/ArrowRectangleIcon";
import UserIcon from "@/icons/UserIcon";
import Link from "next/link";
import React from "react";

type Props = {};

const Action = (props: Props) => {
  return (
    <OnHoverWrapper>
      <Link
        href="/profile"
        className="py-2 px-4 hover:bg-gray-200 flex items-center gap-5"
      >
        <IconWrapper>
          <UserIcon />
        </IconWrapper>
        <span className=" whitespace-nowrap">Akun saya</span>
      </Link>
      <Link
        href="/logout"
        className="py-2 px-4 hover:bg-gray-200 flex items-center gap-5"
      >
        <IconWrapper>
          <ArrowRectangleIcon />
        </IconWrapper>
        <span className=" whitespace-nowrap">Log out</span>
      </Link>
    </OnHoverWrapper>
  );
};

export default Action;
