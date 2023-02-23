import {
  defaultIconProps,
  defaultOutlineIconProps,
  IconProps,
} from "@/types/IconProps";
import React from "react";

const CheckIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...defaultOutlineIconProps}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export default CheckIcon;
