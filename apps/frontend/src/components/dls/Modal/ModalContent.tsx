import React, { useContext } from "react";
import classNames from "classnames";

import { ModalContext } from "./Modal";
import ModalOverlay from "./ModalOverlay";

type Props = {
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
  onClickOverlay?: () => void;
};

const ModalContent = ({
  children,
  closeOnOverlayClick,
  className,
  onClickOverlay,
}: Props) => {
  const { isOpen, close } = useContext(ModalContext);
  return (
    <div
      className={classNames(
        "fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center",
        { invisible: !isOpen },
        { visible: isOpen },
      )}
    >
      <ModalOverlay
        className={classNames({ invisible: !isOpen }, { visible: isOpen })}
        onClick={() => {
          if (closeOnOverlayClick) {
            close();
          }
          onClickOverlay && onClickOverlay();
        }}
      />
      <div
        className={classNames(
          "z-[52] -mt-32 w-[90%] max-w-lg transform rounded-lg bg-white p-5 shadow-2xl transition-all duration-200 dark:bg-slate-600 lg:mt-0",
          { "invisible -translate-y-20 scale-75 opacity-0": !isOpen },
          { "visible translate-y-0 scale-100 opacity-100": isOpen },
          className,
        )}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

export default ModalContent;
