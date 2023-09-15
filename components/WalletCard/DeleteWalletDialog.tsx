"use client";

import Button from "@/dls/Button/Button";
import LoadingButton from "@/dls/Button/LoadingButton";
import Checkbox from "@/dls/Form/Checkbox/Checkbox";
import Heading from "@/dls/Heading";
import { Modal, ModalContent } from "@/dls/Modal";
import { QueryKey } from "@/types/QueryKey";
import { Routes } from "@/types/Routes";
import { WalletData } from "@/types/Wallet";
import { deleteWallet } from "@/utils/api/wallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "../../stores/store";
import { indicatorColor, WalletColor } from "./constants";

const DeleteWalletDialog = () => {
  const { deleteId, setDeleteId } = useStore((state) => ({
    deleteId: state.deleteWalletId,
    setDeleteId: state.setDeleteWalletId,
  }));

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues } = useForm();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: deleteWallet,
    onSuccess: () => {
      // remove deleted wallet from cache
      queryClient.removeQueries([QueryKey.WALLETS, deleteId]);
      queryClient.setQueryData([QueryKey.WALLETS], (oldData: any) => {
        return oldData.filter((wallet: WalletData) => wallet._id !== deleteId);
      });

      // if deleteTransactions is true, invalidate all related queries
      if (getValues("deleteTransactions")) {
        queryClient.invalidateQueries([QueryKey.TOTAL_TRANSACTIONS]);
        queryClient.invalidateQueries([QueryKey.RECENT_TRANSACTIONS]);
        queryClient.invalidateQueries([QueryKey.TRANSACTIONS]);
      }

      toast.success("Dompet berhasil dihapus", {
        icon: "🗑️",
        duration: 3000,
      });
      router.push(Routes.Wallet);
      setDeleteId(null);
    },
  });

  const onSubmitHanlder = (values: any) => {
    mutate({
      param: {
        id: deleteId as string,
      },
      query: {
        deleteTransactions: values.deleteTransactions,
      },
    });
  };

  useEffect(() => {
    if (deleteId) {
      setOpen(true);

      const wallets = queryClient.getQueryData([
        QueryKey.WALLETS,
      ]) as WalletData[];
      const walletData = wallets?.find(
        (wallet: WalletData) => wallet._id === deleteId
      );

      if (!walletData) setOpen(false);
      setWalletData(walletData!);
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteId]);

  return (
    <Modal stateOpen={open}>
      <ModalContent onClickOverlay={() => setDeleteId(null)}>
        <Heading className="mb-4" level={3}>
          Apakah anda yakin untuk menghapus dompet{" "}
          <span
            className={classNames("px-2 py-1 rounded-md mx-1 text-slate-50")}
            style={{
              backgroundColor: walletData?.color?.includes("#")
                ? walletData?.color
                : indicatorColor[walletData?.color as WalletColor],
            }}
          >
            {walletData?.name}
          </span>
          ?
        </Heading>
        <span className=" text-slate-600 dark:text-slate-100 mb-2 block">
          Dompet ini akan dihapus secara permanen dan tidak dapat dikembalikan
        </span>
        <form onSubmit={handleSubmit(onSubmitHanlder)}>
          <Checkbox
            className="mb-7"
            id="check-delete-all-transaction"
            label="Hapus semua transaksi yang berkaitan dengan dompet ini"
            {...register("deleteTransactions")}
          />
          <div className="flex flex-col lg:flex-row gap-4">
            <Button
              onClick={() => setDeleteId(null)}
              buttonStyle="secondary"
              width="full"
              type="button"
            >
              Batal
            </Button>
            <LoadingButton
              onLoadingText="Menghapus dompet"
              onSuccessText="Dompet berhasil dihapus"
              onErrorText="Gagal menghapus dompet"
              title="Hapus dompet"
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              styleButton="danger"
            />
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DeleteWalletDialog;
