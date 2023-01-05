import classNames from "classnames";
import React, { useContext } from "react";
import { ModalContext } from "./Modal";

type Props = {
  onClick?: () => void;
  className?: string;
};

const ModalOverlay = ({ onClick, className }: Props) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "w-screen h-screen bg-slate-400/20 absolute top-0 left-0 z-[51]",
        className
      )}
    ></div>
  );
};

export default ModalOverlay;
