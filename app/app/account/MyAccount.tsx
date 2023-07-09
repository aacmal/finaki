"use client";

import React from "react";
import ThemeSelection from "@/components/ThemeSelection/ThemeSelection";
import Profile from "@/components/Account/Profile";
import DevicesLists from "@/components/Account/DeviceLists";
import LoadingButton from "@/dls/Button/LoadingButton";
import DangerZone from "@/components/Account/DangerZone";

type Props = {};

const MyAccount = (props: Props) => {
  return (
    <div className="space-y-10 mt-6">
      <Profile />
      <ThemeSelection />
      <DevicesLists />
      <DangerZone />
    </div>
  );
};

export default MyAccount;
