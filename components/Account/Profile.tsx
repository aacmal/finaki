import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import ClipboardIcon from "@/icons/ClipboardIcon";
import React from "react";
import useStore from "../../stores/store";
import ContentWrapper from "../Container/ContentWrapper";

type Props = {
  className?: string;
};

const Profile = (props: Props) => {
  const { user } = useStore((state) => ({ user: state.user }));

  return (
    <div className={props.className}>
      <Heading level={2} fontWeight="medium">
        Informasi tentang akun
      </Heading>
      <ContentWrapper className="flex flex-col gap-3">
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
      </ContentWrapper>
    </div>
  );
};

export default Profile;
