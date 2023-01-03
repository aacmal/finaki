"use client";

import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import ClipboardIcon from "@/icons/ClipboardIcon";
import React from "react";
import useStore from "../../../stores/store";

type Props = {};

// TODO: Refactor this component

const ProfilePage = (props: Props) => {
  const { user } = useStore((state) => ({ user: state.user }));

  return (
    <div className="mt-5">
      <Heading level={2} fontWeight="medium">
        Informasi tentang akun
      </Heading>
      <div className="p-5 bg-white rounded-2xl flex flex-col gap-3 mt-4">
        <div className="flex  lg:flex-row flex-col lg:items-center">
          <span className="w-[18%] font-semibold">Nama</span>
          <span className="lg:ml-0 ml-3">{user?.name}</span>
        </div>
        <div className="flex  lg:flex-row flex-col lg:items-center">
          <span className="w-[18%] font-semibold">Email</span>
          <span className="lg:ml-0 ml-3">{user?.email}</span>
        </div>
        <span className="flex lg:flex-row flex-col lg:items-center">
          <span className="w-[18%] font-semibold whitespace-nowrap flex items-center gap-2">
            <span>Token Telegram</span>
            <IconWrapper className="w-5">
              <ClipboardIcon />
            </IconWrapper>
          </span>
          <span className="lg:ml-0 ml-3">{user?.tokenTelegram}</span>
        </span>
      </div>
    </div>
  );
};

export default ProfilePage;
