import { transferBalance } from "@/api/wallet";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import { removeCurrencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useStore from "../../stores/store";
import LoadingButton from "../dls/Button/LoadingButton";
import CurrencyInput from "../dls/Form/CurrencyInput";
import InputWithLabel from "../dls/Form/InputWithLabel";
import TextArea from "../dls/Form/TextArea";
import Heading from "../dls/Heading";
import IconButton from "../dls/IconButton";
import IconWrapper from "../dls/IconWrapper";
import { Modal, ModalContent } from "../dls/Modal";
import Option from "../dls/Select/Option";
import Select from "../dls/Select/Select";
import ArrowIcon from "../icons/ArrowIcon";
import XmarkIcon from "../icons/XmarkIcon";
import { indicatorColor } from "./constants";

const TransferBalanceDialog = () => {
  const { sourceWalletId, destinationWalletId, isOpen, setOpen } = useStore(
    (state) => state.transferBalanceState,
  );

  const { control, handleSubmit, register, unregister, reset } = useForm();
  const queryClient = useQueryClient();
  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];

  const { mutate, isLoading } = useMutation({
    mutationFn: transferBalance,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.WALLETS]);
      toast.success("Berhasil memindahkan saldo");
      reset({
        sourceWallet: sourceWalletId,
      });
    },
    onError: (data) => {
      toast.error((data as any).response.data.message);
    },
  });

  const onSubmitHandler = (data: any) => {
    if (data.sourceWallet === data.destinationWallet) {
      toast.error("Dompet asal dan tujuan tidak boleh sama");
      return;
    }
    data.amount = removeCurrencyFormat(data.amount);
    mutate(data);
  };

  return (
    <Modal stateOpen={isOpen}>
      <ModalContent>
        <div className="mb-5 flex items-center justify-between">
          <Heading level={3}>Pindahkan Saldo</Heading>
          <IconButton
            className="dark:text-slate-100"
            onClick={() => {
              setOpen(false);
              unregister();
            }}
          >
            <XmarkIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-6 flex flex-col items-center gap-4 lg:flex-row">
            <Controller
              name="sourceWallet"
              control={control}
              render={({ field }) => (
                <Select
                  disabled
                  required
                  className="!w-full lg:flex-1"
                  {...field}
                  placeholder="Dompet Asal"
                >
                  {wallets.map((wallet) => (
                    <Option
                      selected={wallet._id === sourceWalletId}
                      className={classNames(
                        "mx-2 mb-2 flex items-center justify-between rounded-lg border-2 border-transparent p-3 font-bold text-slate-50 hover:border-blue-400",
                      )}
                      key={wallet._id}
                      value={wallet._id}
                      style={{
                        backgroundColor: wallet.color.includes("#")
                          ? wallet.color
                          : (indicatorColor as any)[wallet.color],
                      }}
                    >
                      {wallet.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <IconWrapper>
              <ArrowIcon
                strokeWidth={2}
                className="dark:text-slate-100 lg:-rotate-90"
                direction="down"
              />
            </IconWrapper>
            <Controller
              name="destinationWallet"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  className="!w-full lg:flex-1"
                  {...field}
                  placeholder="Dompet Tujuan"
                >
                  {wallets.map((wallet) => (
                    <Option
                      selected={wallet._id === destinationWalletId}
                      className={classNames(
                        "mx-2 mb-2 flex items-center justify-between rounded-lg border-2 border-transparent p-3 font-bold text-slate-50 hover:border-blue-400",
                      )}
                      key={wallet._id}
                      value={wallet._id}
                      style={{
                        backgroundColor: wallet.color.includes("#")
                          ? wallet.color
                          : (indicatorColor as any)[wallet.color],
                      }}
                    >
                      {wallet.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>
          <InputWithLabel
            type="text"
            placeholder="Convert dari tunai ke saldo"
            label="Deskripsi (opsional)"
            id="description"
            className="mb-6"
            {...register("description")}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                required
                min={1}
                className="mb-6 !w-full"
                placeholder="5.000"
                label="Jumlah"
                id="amount"
                {...field}
              />
            )}
          />
          <TextArea
            placeholder="Tulis catatan disini"
            label="Catatan (opsional)"
            id="note"
            spellCheck={false}
            {...register("note")}
          />
          <LoadingButton
            className="mt-6"
            isLoading={isLoading}
            isSuccess={false}
            onSuccessText="Berhasil Memindahkan Saldo"
            onLoadingText="Memindahkan Saldo"
            title="Pindahkan Saldo"
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TransferBalanceDialog;
