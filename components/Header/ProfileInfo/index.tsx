import IconWrapper from "@/dls/IconWrapper";
import ChevronIcon from "@/icons/ChevronIcon";
import React from "react";
import Action from "./Action";

type Props = {};

const ProfileInfo = (props: Props) => {
  return (
    <div className="flex gap-2 items-center relative group">
      <div className="h-9 w-9 rounded-full bg-gray-300"></div>
      <span className="font-medium">Aca M</span>
      <IconWrapper className="text-gray-800 w-5">
        <ChevronIcon
          className=" group-hover:rotate-180 transition-all"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      </IconWrapper>
      <Action/>
    </div>
  );
};

export default ProfileInfo;
