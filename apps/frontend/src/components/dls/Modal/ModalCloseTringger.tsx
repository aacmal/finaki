import React, { useContext } from "react";

import { ModalContext } from "./Modal";

type Props = {
  children: React.ReactNode;
};

const ModalCloseTringger = (props: Props) => {
  const { close } = useContext(ModalContext);

  return <div onClick={close}>{props.children}</div>;
};

export default ModalCloseTringger;
