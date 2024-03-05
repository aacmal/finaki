"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { QueryKey } from "@/types/QueryKey";
import { Transaction } from "@/types/Transaction";
import { WalletData } from "@/types/Wallet";
import { updateWallet } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import InputWithLabel from "../../../../components/dls/Form/InputWithLabel";
import Heading from "../../../../components/dls/Heading";
import IconButton from "../../../../components/dls/IconButton";
import IconWrapper from "../../../../components/dls/IconWrapper";
import Option from "../../../../components/dls/Select/Option";
import Select from "../../../../components/dls/Select/Select";
import ArrowIcon from "../../../../components/icons/ArrowIcon";
import PencilIcon from "../../../../components/icons/PencilIcon";
import {
  indicatorColor,
  WalletColor,
} from "../../../../components/WalletCard/constants";
import WalletOption from "../../../../components/WalletCard/WalletOption";
import WalletTransaction from "../../../../components/WalletCard/WalletTransaction";

const WalletDetailPage = () => {
  const urlPath = usePathname();
  const router = useRouter();
  const id = urlPath!.split("/")[3];
  const queryClient = useQueryClient();
  const customColorRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, control, watch } = useForm();

  const { ref, ...rest } = register("color");

  const [edit, setEdit] = useState<boolean>(false);

  const walletDataQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id],
    queryFn: (): Promise<WalletData> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/wallet.json").then((data) => {
          const wallet = data.data.find((wallet) => wallet._id === id);
          resolve(wallet as WalletData);
        });
      }),
  });

  const walletTransactionsQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id, QueryKey.TRANSACTIONS],
    queryFn: (): Promise<Transaction[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/transaction.json").then((data) => {
          const walletId = id;
          const WalletTransaction = data.data.filter((transaction) => {
            return transaction.walletId === walletId;
          });
          resolve(WalletTransaction as Transaction[]);
        });
      }),
  });

  const updateWalletMutation = useMutation({
    mutationFn: updateWallet,
    onSuccess: (data) => {
      // update current wallet
      queryClient.setQueryData([QueryKey.WALLETS, id], {
        ...walletDataQuery.data,
        name: data.name,
        color: data.color,
      });

      // update all wallets
      queryClient.setQueryData([QueryKey.WALLETS], (oldData: any) => {
        return oldData.map((wallet: any) => {
          if (wallet._id === id) {
            return { ...wallet, name: data.name, color: data.color };
          }
          return wallet;
        });
      });
      toast.success("Dompet berhasil diubah");
      setEdit(false);
    },
  });

  if (walletDataQuery.isLoading) {
    return (
      <Heading className="mt-10 animate-pulse text-center" level={3}>
        Memuat...
      </Heading>
    );
  }

  if (!walletDataQuery.data) {
    return <Heading level={3}>Terjadi Kesalahan</Heading>;
  }

  const onSaveHandle = (data: any) => {
    // if the data same, dont update
    if (
      data.name === walletDataQuery.data.name &&
      data.color === walletDataQuery.data.color
    ) {
      setEdit(false);
      return;
    }
    updateWalletMutation.mutate({
      id,
      data: data,
    });
  };

  const walletColor = walletDataQuery.data.color;

  return (
    <div
      className={classNames(
        "absolute left-0 min-h-screen w-full rounded-2xl p-3 pb-32 lg:static lg:h-auto lg:min-h-fit lg:p-5 lg:pb-5",
      )}
      style={{
        backgroundColor: edit
          ? watch("color")?.includes("#")
            ? watch("color")
            : indicatorColor[watch("color") as WalletColor]
          : walletColor.includes("#")
            ? walletColor
            : indicatorColor[walletColor as WalletColor],
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        {!edit ? (
          <IconButton onClick={() => router.back()} className="text-slate-50">
            <ArrowIcon direction="left" strokeWidth={2} />
          </IconButton>
        ) : (
          <IconWrapper className="text-slate-50">
            <PencilIcon strokeWidth={2} />
          </IconWrapper>
        )}
        <Heading fontWeight="medium" level={3} defaultColor="bright">
          {edit ? "Edit Dompet" : "Rincian Dompet"}
        </Heading>
      </div>
      {/* <AreaChart
        size="medium"
        xAxis={false}
        horizonalLines={false}
        theme="transparent"
        data={walletDataQuery.data.balanceHistory}
      /> */}
      {!edit ? (
        <div className="py-10 text-center text-2xl font-semibold text-slate-50">
          {walletDataQuery.data.name} <br />
          {currencyFormat(walletDataQuery.data.balance as number)}
        </div>
      ) : (
        <form
          className="flex justify-center gap-3 font-medium"
          id="edit-wallet-form"
          onSubmit={handleSubmit(onSaveHandle)}
        >
          <InputWithLabel
            spellCheck={false}
            placeholder="Nama Dompet"
            defaultValue={walletDataQuery.data.name}
            className="w-44"
            inputStyle="!p-2 !text-white !placeholder-slate-200 !bg-transparent"
            type="text"
            id="name"
            required
            {...register("name")}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Select
                className="!p-2 !text-slate-50"
                minWidth="min-w-[7rem]"
                required
                placeholder="Warna"
                {...field}
              >
                {Object.keys(indicatorColor).map((key: string) => (
                  <Option
                    selected={key === walletDataQuery.data.color}
                    key={key}
                    value={key}
                  >
                    {key}
                  </Option>
                ))}
                <Option
                  selected={walletColor.includes("#")}
                  value={walletColor}
                  onClick={() => customColorRef.current?.click()}
                >
                  custom color
                </Option>
              </Select>
            )}
          />
          <input
            value={walletColor}
            {...rest}
            ref={(e) => {
              customColorRef.current = e;
              ref(e);
            }}
            type="color"
            className="sr-only"
          />
        </form>
      )}
      <WalletOption
        state={{ edit, setEdit }}
        walletData={walletDataQuery.data}
      />
      <WalletTransaction transactions={walletTransactionsQuery.data} />
    </div>
  );
};

export default WalletDetailPage;
