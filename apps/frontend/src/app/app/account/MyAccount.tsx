"use client";

import DangerZone from "../../../components/Account/DangerZone";
import DevicesLists from "../../../components/Account/DeviceLists";
import Profile from "../../../components/Account/Profile";
import ThemeSelection from "../../../components/ThemeSelection/ThemeSelection";

const MyAccount = () => {
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
