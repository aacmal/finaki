"use client";

import Button from "@/dls/Button/Button";
import Divider from "@/dls/Divider";
import Heading from "@/dls/Heading";
import Modal from "@/dls/Modal/Modal";
import ModalContent from "@/dls/Modal/ModalContent";
import ModalOverlay from "@/dls/Modal/ModalOverlay";
import ModalTrigger from "@/dls/Modal/ModalTrigger";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { useState } from "react";
import AddTransaction from "../Transactions/AddTransaction";
import ProfileInfo from "./ProfileInfo";
import { Routes } from "@/types/Routes";
import { LayoutSegment } from "@/types/LayoutSegment";

type Props = {};

const Header = (props: Props) => {
  const selectedLayout = useSelectedLayoutSegment();
  const [showModal, setShowModal] = useState(false);

  const getHeaderTitle = (selectedLayout: string | null) => {
    switch (selectedLayout) {
      case LayoutSegment.DASHBOARD:
        return "Dashboard";
      case LayoutSegment.WALLET:
        return "My Wallet";
      case LayoutSegment.TRANSACTIONS:
        return "Transactions";
      case LayoutSegment.SETTINGS:
        return "Settings";
      case LayoutSegment.PROFILE:
        return "Profile";
      default:
        return "";
    }
  };
  return (
    <header className="flex justify-between my-4 items-center w-full px-2 lg:px-5">
      <Heading level={1}>{getHeaderTitle(selectedLayout)}</Heading>
      <div className="flex items-center gap-4 h-full">
        <AddTransaction />
        <Divider className="lg:block hidden" vertical />
        <ProfileInfo />
      </div>
    </header>
  );
};

export default Header;
