import React from "react";
import classNames from "classnames";

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
        "flex w-full items-center gap-10 rounded-xl p-5 text-white shadow-lg",
        className,
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
