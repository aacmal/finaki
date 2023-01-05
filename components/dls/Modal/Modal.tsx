import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const ModalContext = createContext<any>(false);
// create provider
export const ModalProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  if (typeof window !== "undefined") {
    if (isOpen === true) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {props.children}
    </ModalContext.Provider>
  );
};

const Modal = (props: Props) => {
  // create context

  return <ModalProvider>{props.children}</ModalProvider>;
};

export default Modal;
