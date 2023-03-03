import { detachTelegramAccount } from "@/api/user";
import LoadingButton from "@/dls/Button/LoadingButton";
import { QueryKey } from "@/types/QueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import useStore from "../../stores/store";

type Props = {};

const DangerZone = (props: Props) => {
  const queryClient = useQueryClient();
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const { isLoading, mutate } = useMutation({
    mutationFn: detachTelegramAccount,
    onSuccess: () => {
      setUser({
        ...user!,
        telegramAccount: null,
      });
      toast.success("Akun Telegram Berhasil diputuskan");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Gagal memutuskan akun Telegram");
    },
  });

  return (
    <div className="w-full">
      {user?.telegramAccount?.username && (
        <LoadingButton
          isLoading={isLoading}
          onLoadingText="Memutuskan"
          title="Putuskan Akun Telegram"
          styleButton="danger"
          onClick={() => mutate()}
          className="font-bold"
        />
      )}
    </div>
  );
};

export default DangerZone;
