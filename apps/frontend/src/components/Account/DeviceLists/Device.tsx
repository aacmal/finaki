import { logoutDevices } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import parser from "ua-parser-js";

import LoadingButton from "../../dls/Button/LoadingButton";
import DesktopIcon from "../../icons/DesktopIcon";
import PhoneIcon from "../../icons/PhoneIcon";

type Props = {
  _id: string;
  userAgent: string;
  createdAt: string;
  isCurrent: boolean;
  isLastItem: boolean;
};

const Device = ({
  _id,
  userAgent,
  createdAt,
  isCurrent,
  isLastItem,
}: Props) => {
  const queryClient = useQueryClient();

  const ua = parser(userAgent);
  const date = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: logoutDevices,
    onSuccess: () => {
      queryClient.setQueryData(["devices"], (oldData: any) => {
        return oldData.filter((device: any) => device._id !== _id);
      });
      toast.success(
        `Perangkat ${ua.device.model} berhasil dihapus, proses ini setidaknya membutuhkan waktu 15 menit`,
      );
    },
  });

  const handleDeleteDevice = (id: string) => {
    mutate([id]);
  };

  return (
    <div
      className={classNames(
        "group flex items-center justify-between border-gray-200 py-3 dark:border-slate-500",
        {
          "border-b": !isLastItem,
        },
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 text-slate-800 dark:text-slate-200 md:w-10">
          {ua.device.type === "mobile" ? (
            <PhoneIcon stroke="currentColor" strokeWidth={1.5} />
          ) : (
            <DesktopIcon stroke="currentColor" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-slate text-lg font-bold">
            <span>{ua.device.model || ua.os.name}</span>
            {isCurrent && (
              <span className="ml-2 rounded-full border border-blue-500 px-2 py-1 text-xs font-medium text-blue-500">
                Sekarang
              </span>
            )}
          </span>
          <span>{ua.browser.name}</span>
          <span className="text-sm opacity-70">Login pada : {date}</span>
        </div>
      </div>
      {!isCurrent && (
        <LoadingButton
          onClick={() => handleDeleteDevice(_id)}
          styleButton="danger"
          className={classNames(
            "!px-3 !py-2 !font-bold lg:invisible lg:group-hover:visible",
            { "lg:!visible": isLoading },
          )}
          width="fit"
          title="Hapus"
          isLoading={isLoading}
          onLoadingText="Menghapus"
          background={false}
        />
      )}
    </div>
  );
};

export default Device;
