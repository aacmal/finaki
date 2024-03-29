import { ArrowIconProps, defaultOutlineIconProps } from "@/types/IconProps";
import classNames from "classnames";

const ArrowIcon = ({ direction, className, ...props }: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...defaultOutlineIconProps}
      {...props}
      className={classNames(
        "transform",
        { "rotate-180": direction === "up" },
        { "rotate-90": direction === "left" },
        { "-rotate-90": direction === "right" },
        { "": direction === "down" },
        className
      )}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  );
};

export default ArrowIcon;
