import Heading from "../dls/Heading";
import IconWrapper from "../dls/IconWrapper";
import ClipboardIcon from "../icons/ClipboardIcon";
import { toast } from "react-hot-toast";
import useStore from "../../stores/store";
import ContentWrapper from "../Container/ContentWrapper";
import Link from "next/link";

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
        <div className="flex  lg:flex-row flex-col lg:items-center">
          <span className="w-[10%] font-semibold">Nama</span>
          <span className="lg:ml-0 ml-3">{user?.name}</span>
        </div>
        <div className="flex  lg:flex-row flex-col lg:items-center">
          <span className="w-[10%] font-semibold">Email</span>
          <span className="lg:ml-0 ml-3">{user?.email}</span>
        </div>
        <span className="flex lg:flex-row flex-col lg:items-start">
          <span className="w-[10%] font-semibold whitespace-nowrap flex items-center gap-2">
            <span>Token</span>
          </span>
          <div className="flex-col flex lg:ml-0 ml-3 ">
            <div className="mr-4 flex gap-4">
              {user?.token}
              <IconWrapper
                onClick={copyTokenToClipboard}
                className="w-5 cursor-pointer"
              >
                <ClipboardIcon />
              </IconWrapper>
            </div>
            <p className="text-sm mt-2">
              <Link
                className="underline text-blue-500"
                href="/telegram-integration"
              >
                Hubungkan dengan Telegram
              </Link>
            </p>
          </div>
        </span>
        {user?.telegramAccount?.username && (
          <>
            <hr className="border-gray-200 dark:border-slate-500 my-3" />
            <Heading fontWeight="normal" className="!text-base" level={3}>
              Akun Telegram yang terhubung
            </Heading>
            <div className="flex lg:flex-row flex-col lg:items-center">
              <span className="w-[10%] font-semibold">Username</span>
              <span className="lg:ml-0 ml-3">
                @{user?.telegramAccount?.username}
              </span>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center">
              <span className="w-[10%] font-semibold">Nama</span>
              <span className="lg:ml-0 ml-3">
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
