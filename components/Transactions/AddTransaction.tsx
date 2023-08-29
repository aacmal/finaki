import LoadingButton from "@/dls/Button/LoadingButton";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import RadioButton from "@/dls/Form/Radio/RadioButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalContent } from "@/dls/Modal";
import ArrowIcon from "@/icons/ArrowIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import { insertNewTransaction } from "@/api/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { TransactionInput } from "@/api/types/TransactionAPI";
import { QueryKey } from "@/types/QueryKey";
import { getAllWallets } from "@/api/wallet";
import Select from "@/dls/Select/Select";
import Option from "@/dls/Select/Option";
import { indicatorColor, WalletColor } from "../WalletCard/constants";
import { removeCurrencyFormat } from "@/utils/currencyFormat";
import CurrencyInput from "@/dls/Form/CurrencyInput";
import TextArea from "@/dls/Form/TextArea";
import useStore from "../../stores/store";
import { WalletData } from "@/types/Wallet";
import useTransaction from "../../stores/transactionStore";

type Props = {};

const AddTransaction = (props: Props) => {
  const { dispatchAddTransaction } = useTransaction((state) => ({
    dispatchAddTransaction: state.dispatchAddTransaction,
  }));

  const { isOpen, setOpen, walletId } = useStore(
    (state) => state.addTransactionState
  );

  const {
    handleSubmit,
    register,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const walletQuery = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
    onSuccess: (data) => {
      // console.log(data);
    },
  });

  const { isLoading, mutate, isSuccess, isError } = useMutation({
    mutationFn: insertNewTransaction,
    onSuccess: (data) => {
      // push new transaction to recent transaction query cache
      queryClient.setQueryData(
        [QueryKey.RECENT_TRANSACTIONS],
        (oldData: any) => {
          if (!oldData) return;
          const transactions = oldData.transactions;
          return {
            transactions: [data, ...transactions],
          };
        }
      );

      // add new transaction to transaction store
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) => {
        if (!oldData) return;
        dispatchAddTransaction(data);
      });

      // refetch dashboard data
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      if (data.walletId) {
        queryClient.refetchQueries([QueryKey.WALLETS]);
        queryClient.invalidateQueries([QueryKey.WALLETS, data.walletId]);
      }
      reset();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmitHandler = (values: any) => {
    const data: TransactionInput = {
      description: values.description,
      amount: removeCurrencyFormat(values.amount),
      type: values["transaction-type"],
      note: values.note,
      walletId: values.wallet ?? null,
    };

    // get balance of selected wallet
    const walletBalance = walletQuery.data?.find(
      (wallet) => wallet._id === values.wallet
    )?.balance;

    // check if transaction type is out and wallet balance is less than amount
    if (values["transaction-type"] === "out" && walletBalance! < data.amount) {
      setError(
        "amount",
        {
          type: "manual",
          message: "Saldo tidak mencukupi",
        },
        { shouldFocus: true }
      );
      return;
    }
    mutate(data);
  };

  const sortedWallet =
    walletQuery.data
      ?.sort(
        (a, b) =>
          new Date(a.updatedAt!).getTime() - new Date(b.updatedAt!).getTime()
      )
      .reverse() ?? [];

  return (
    <Modal stateOpen={isOpen || walletId !== null}>
      <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Heading level={3}>Tambah Transaksi</Heading>
            <IconWrapper
              onClick={() => setOpen(false)}
              className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20"
            >
              <XmarkIcon />
            </IconWrapper>
          </div>
          <InputWithLabel
            id="description"
            type="text"
            placeholder="Top up Diamond"
            label="Deskripsi"
            className="w-full"
            minLength={3}
            required
            {...register("description")}
          />
          <div className="flex gap-5 flex-col lg:flex-row">
            <ul className="flex gap-2">
              <RadioButton
                id="in"
                label="Masuk"
                value="in"
                required
                icon={
                  <ArrowIcon
                    direction="up"
                    strokeWidth={3}
                    className="text-blue-500"
                  />
                }
                {...register("transaction-type")}
              />
              <RadioButton
                id="out"
                label="Keluar"
                value="out"
                required
                icon={
                  <ArrowIcon
                    strokeWidth={3}
                    direction="down"
                    className="text-orange-500"
                  />
                }
                {...register("transaction-type")}
              />
            </ul>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  id="amount"
                  placeholder="Rp. 12000"
                  label="Jumlah"
                  className="flex-1"
                  minLength={2}
                  required
                  {...field}
                  error={errors.amount as any}
                />
              )}
            />
          </div>
          <Controller
            name="wallet"
            control={control}
            render={({ field }) => (
              <Select
                optional
                className="w-full"
                required={false}
                placeholder="Pilih Dompet (Opsional)"
                {...field}
              >
                {sortedWallet.map((wallet: WalletData) => (
                  <Option
                    selected={wallet._id === walletId}
                    className={classNames(
                      "p-3 rounded-lg mx-2 mb-2 font-bold border-2 border-transparent text-slate-50 hover:border-blue-400 flex justify-between items-center"
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
          <TextArea
            id="note"
            placeholder="Topup diamond untuk beli skin Legend"
            label="Catatan (Opsional)"
            className="w-full"
            {...register("note")}
          />
          <LoadingButton
            isLoading={isLoading}
            onLoadingText="Menambahkan"
            isSuccess={isSuccess}
            onSuccessText="Tambah lagi"
            isError={isError}
            onErrorText="Gagal, coba lagi"
            title="Tambahkan"
          />
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTransaction;
