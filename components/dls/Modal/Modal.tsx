import { createContext, useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  stateOpen?: boolean;
  onClose?: () => void;
};

export const ModalContext = createContext<any>(false);
// create provider
export const Modal = ({
  children,
  defaultOpen,
  stateOpen,
  ...props
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen ?? false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    props.onClose && props.onClose();
  }

  if (typeof window !== "undefined") {
    if (isOpen === true) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }

  return (
    <ModalContext.Provider value={{ isOpen: stateOpen ?? isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

export default Modal;
