import classNames from "classnames";
import React from "react";
import Heading from "../Heading";

type TextWithIconProps = {
  iconPosition?: "left" | "right";
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const TextWithIcon = ({
  iconPosition = "left",
  icon,
  className,
  children,
}: TextWithIconProps) => {
  return (
    <div
      className={classNames(
        "gap-10 w-full p-5 rounded-xl flex items-center text-white shadow-lg",
        className
      )}
    >
      {iconPosition === "left" && <div className="w-6">{icon}</div>}
      <Heading level={4} fontWeight="medium" defaultColor="bright">
        {children}
      </Heading>
      {iconPosition === "right" && <div className="w-6">{icon}</div>}
    </div>
  );
};

export default TextWithIcon;
