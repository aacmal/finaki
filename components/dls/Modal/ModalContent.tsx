import classNames from "classnames";
import React, { useContext } from "react";
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
        "w-screen h-screen fixed z-50 top-0 left-0 grid place-items-center",
        { invisible: !isOpen },
        { visible: isOpen }
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
          "p-5 bg-white shadow-2xl w-[90%] -mt-32 lg:mt-0 max-w-lg rounded-lg z-[52] duration-200 transition-all transform dark:bg-slate-600",
          { "scale-75 -translate-y-20 invisible opacity-0": !isOpen },
          { "scale-100 translate-y-0 visible opacity-100": isOpen },
          className
        )}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

export default ModalContent;
