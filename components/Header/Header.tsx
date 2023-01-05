"use client";

import Button from "@/dls/Button/Button";
import Divider from "@/dls/Divider";
import Heading from "@/dls/Heading";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TransactionForm from "../Transactions/TransactionForm";
import ProfileInfo from "./ProfileInfo";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const getHeaderTitle = (pathname: string | null) => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/transactions":
        return "Transactions";
      case "/settings":
        return "Settings";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };
  return (
    <header className="flex justify-between my-4 items-center w-full px-2 lg:px-5">
      <Heading level={1}>{getHeaderTitle(pathname)}</Heading>
      <div className="flex items-center gap-4 h-full">
        <button
          type="submit"
          className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg font-bold"
        >
          Tambah
        </button>
        <Divider vertical />
        <ProfileInfo />
      </div>
      <TransactionForm />
    </header>
  );
};

export default Header;
