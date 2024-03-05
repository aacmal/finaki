import { useContext } from "react";

import { ModalContext } from "./Modal";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ModalTrigger = ({ children, className }: Props) => {
  const { open } = useContext(ModalContext);

  return (
    <div onClick={open} className={className} role="button">
      {children}
    </div>
  );
};

export default ModalTrigger;
