import { toast } from "react-hot-toast";

import useStore from "../../stores/store";
import ContentWrapper from "../Container/ContentWrapper";
import Heading from "../dls/Heading";
import IconWrapper from "../dls/IconWrapper";
import ClipboardIcon from "../icons/ClipboardIcon";

type Props = {
  className?: string;
};

const Profile = (props: Props) => {
  const { user } = useStore((state) => ({ user: state.user }));

  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(user?.token || "");
    toast.success("Token berhasil disalin");
  };

  return (
    <div className={props.className}>
      <Heading level={2} fontWeight="medium">
        Informasi tentang akun
      </Heading>
      <ContentWrapper className="flex flex-col gap-3">
        <div className="flex  flex-col lg:flex-row lg:items-center">
          <span className="w-[10%] font-semibold">Nama</span>
          <span className="ml-3 lg:ml-0">{user?.name}</span>
        </div>
        <div className="flex  flex-col lg:flex-row lg:items-center">
          <span className="w-[10%] font-semibold">Email</span>
          <span className="ml-3 lg:ml-0">{user?.email}</span>
        </div>
        <span className="flex flex-col lg:flex-row lg:items-center">
          <span className="flex w-[10%] items-center gap-2 whitespace-nowrap font-semibold">
            <span>Token</span>
          </span>
          <span className="ml-3 mr-4 flex gap-4 lg:ml-0">
            {user?.token}
            <IconWrapper
              onClick={copyTokenToClipboard}
              className="w-5 cursor-pointer"
            >
              <ClipboardIcon />
            </IconWrapper>
          </span>
        </span>
        {user?.telegramAccount?.username && (
          <>
            <hr className="my-3 border-gray-200 dark:border-slate-500" />
            <Heading fontWeight="normal" className="!text-base" level={3}>
              Akun Telegram yang terhubung
            </Heading>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="w-[10%] font-semibold">Username</span>
              <span className="ml-3 lg:ml-0">
                @{user?.telegramAccount?.username}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="w-[10%] font-semibold">Nama</span>
              <span className="ml-3 lg:ml-0">
                {user?.telegramAccount?.firstName}
              </span>
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Profile;
