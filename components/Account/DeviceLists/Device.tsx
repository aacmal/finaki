import { logoutDevices } from "@/api/user";
import LoadingButton from "@/dls/Button/LoadingButton";
import DesktopIcon from "@/icons/DesktopIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";
import { toast } from "react-hot-toast";
import parser from "ua-parser-js";

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

  const { isLoading, isError, mutate } = useMutation({
    mutationFn: logoutDevices,
    onSuccess: (data) => {
      queryClient.setQueryData(["devices"], (oldData: any) => {
        return oldData.filter((device: any) => device._id !== _id);
      });
      toast.success(
        `Perangkat ${ua.device.model} berhasil dihapus, proses ini setidaknya membutuhkan waktu 15 menit`
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDeleteDevice = (id: string) => {
    mutate([id]);
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-between group border-gray-200 dark:border-slate-500 py-3",
        {
          "border-b": !isLastItem,
        }
      )}
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-800 dark:text-slate-200 w-6 md:w-10">
          {ua.device.type === "mobile" ? (
            <PhoneIcon stroke="currentColor" strokeWidth={1.5} />
          ) : (
            <DesktopIcon stroke="currentColor" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg text-slate">
            <span>{ua.device.model || ua.os.name}</span>
            {isCurrent && (
              <span className="text-xs text-blue-500 border-blue-500 font-medium py-1 px-2 ml-2 border rounded-full">
                Sekarang
              </span>
            )}
          </span>
          <span>{ua.browser.name}</span>
          <span className="opacity-70 text-sm">Login pada : {date}</span>
        </div>
      </div>
      {!isCurrent && (
        <LoadingButton
          onClick={() => handleDeleteDevice(_id)}
          styleButton="danger"
          className={classNames(
            "!font-bold !px-3 !py-2 lg:invisible lg:group-hover:visible",
            { "lg:!visible": isLoading }
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
