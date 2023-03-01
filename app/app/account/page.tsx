"use client";

import React from "react";
import ThemeSelection from "@/components/ThemeSelection/ThemeSelection";
import Profile from "@/components/Account/Profile";
import DevicesLists from "@/components/Account/DeviceLists";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="space-y-10 mt-6">
      <Profile />
      <ThemeSelection />
      <DevicesLists />
    </div>
  );
};

export default Page;
