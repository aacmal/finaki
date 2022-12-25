import IconWrapper from "@/dls/IconWrapper";
import ArrowRectangleIcon from "@/icons/ArrowRectangleIcon";
import UserIcon from "@/icons/UserIcon";
import Link from "next/link";
import React from "react";

type Props = {};

const Action = (props: Props) => {
  return (
    <div className="absolute py-1 shadow-xl rounded-lg top-0 right-0 bg-white z-30 w-fit invisible opacity-0 transition-all delay-200 group-hover:top-8 group-hover:opacity-100 group-hover:visible">
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
    </div>
  );
};

export default Action;
