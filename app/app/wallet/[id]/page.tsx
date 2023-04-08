"use client";

import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import { indicatorColor } from "@/components/WalletCard/constants";
import { ColorCircle } from "@/components/WalletCard/WalletCardDropdown";
import WalletOption from "@/components/WalletCard/WalletOption";
import WalletTransaction from "@/components/WalletCard/WalletTransaction";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import IconWrapper from "@/dls/IconWrapper";
import Option from "@/dls/Select/Option";
import Select from "@/dls/Select/Select";
import ArrowIcon from "@/icons/ArrowIcon";
import PencilIcon from "@/icons/PencilIcon";
import { QueryKey } from "@/types/QueryKey";
import {
  getOneWallet,
  getWalletTransactions,
  updateWallet,
} from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {};

const WalletDetailPage = (props: Props) => {
  const urlPath = usePathname();
  const router = useRouter();
  const id = urlPath!.split("/")[3];
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, watch } = useForm();

  const [edit, setEdit] = useState<boolean>(false);

  const walletDataQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id],
    queryFn: () => getOneWallet(id),
    onError: (error) => {
      console.log(error);
    },
  });

  const walletTransactionsQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id, QueryKey.TRANSACTIONS],
    queryFn: () => getWalletTransactions(id),
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
      <Heading className="text-center mt-10 animate-pulse" level={3}>
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

  return (
    <div
      className={classNames(
        "p-3 lg:p-5 rounded-2xl w-full absolute min-h-screen lg:min-h-fit lg:h-auto lg:static left-0 lg:pb-5 pb-32",
        (indicatorColor as any)[
          !edit ? walletDataQuery.data.color : watch("color")
        ]
      )}
    >
      <div className="flex gap-3 items-center mb-5">
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
        <div className="text-center text-2xl font-semibold text-slate-50 py-10">
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
                minWidth="min-w-[4.5rem]"
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
              </Select>
            )}
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
