import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import { Modal, ModalContent } from "@/dls/Modal";
import Option from "@/dls/Select/Option";
import Select from "@/dls/Select/Select";
import XmarkIcon from "@/icons/XmarkIcon";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import classNames from "classnames";
import { indicatorColor } from "./constants";
import IconWrapper from "@/dls/IconWrapper";
import ArrowIcon from "@/icons/ArrowIcon";
import LoadingButton from "@/dls/Button/LoadingButton";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { transferBalance } from "@/api/wallet";
import useStore from "../../stores/store";
import CurrencyInput from "@/dls/Form/CurrencyInput";
import { removeCurrencyFormat } from "@/utils/currencyFormat";

type Props = {};

const TransferBalanceDialog = ({}: Props) => {
  const { sourceWalletId, destinationWalletId, isOpen, setOpen } = useStore(
    (state) => state.transferBalanceState
  );

  const { control, handleSubmit, register, unregister, reset } = useForm();
  const queryClient = useQueryClient();
  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];

  const { mutate, isLoading } = useMutation({
    mutationFn: transferBalance,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.WALLETS]);
      toast.success("Berhasil memindahkan saldo");
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
    reset({
      sourceWallet: sourceWalletId,
    });
    mutate(data);
  };

  return (
    <Modal stateOpen={isOpen}>
      <ModalContent>
        <div className="flex justify-between items-center mb-5">
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
          <div className="flex items-center gap-4 flex-col lg:flex-row mb-6">
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
                        "p-3 rounded-lg mx-2 mb-2 font-bold border-2 border-transparent text-slate-50 hover:border-blue-400 flex justify-between items-center",
                        (indicatorColor as any)[wallet.color]
                      )}
                      key={wallet._id}
                      value={wallet._id}
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
                className="lg:-rotate-90 dark:text-slate-100"
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
                        "p-3 rounded-lg mx-2 mb-2 font-bold border-2 border-transparent text-slate-50 hover:border-blue-400 flex justify-between items-center",
                        (indicatorColor as any)[wallet.color]
                      )}
                      key={wallet._id}
                      value={wallet._id}
                    >
                      {wallet.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                required
                min={1}
                className="!w-full"
                placeholder="5.000"
                label="Jumlah"
                id="amount"
                {...field}
              />
            )}
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
