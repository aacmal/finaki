"use client";

import Button from "@/dls/Button/Button";
import Divider from "@/dls/Divider";
import Heading from "@/dls/Heading";
import Modal from "@/dls/Modal/Modal";
import ModalContent from "@/dls/Modal/ModalContent";
import ModalOverlay from "@/dls/Modal/ModalOverlay";
import ModalTrigger from "@/dls/Modal/ModalTrigger";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddTransaction from "../Transactions/AddTransaction";
import ProfileInfo from "./ProfileInfo";
import { Routes } from "@/types/Routes";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const getHeaderTitle = (pathname: string | null) => {
    console.log(pathname);

    switch (pathname) {
      case Routes.Dashboard:
        return "Dashboard";
      case Routes.Transactions:
        return "Transactions";
      case Routes.Settings:
        return "Settings";
      case Routes.Profile:
        return "Profile";
      default:
        return "Dashboard";
    }
  };
  return (
    <header className="flex justify-between my-4 items-center w-full px-2 lg:px-5">
      <Heading level={1}>{getHeaderTitle(pathname)}</Heading>
      <div className="flex items-center gap-4 h-full">
        <AddTransaction />
        <Divider vertical />
        <ProfileInfo />
      </div>
    </header>
  );
};

export default Header;
