"use cleint";

import { WalletInput } from "@/api/types/WalletAPI";
import LoadingButton from "@/dls/Button/LoadingButton";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalCloseTringger, ModalContent } from "@/dls/Modal";
import ModalTrigger from "@/dls/Modal/ModalTrigger";
import Option from "@/dls/Select/Option";
import Select from "@/dls/Select/Select";
import XmarkIcon from "@/icons/XmarkIcon";
import { QueryKey } from "@/types/QueryKey";
import { createNewWallet } from "@/utils/api/wallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { indicatorColor } from "./constants";
import { ColorCircle } from "./WalletCardDropdown";
import CurrencyInput from "@/dls/Form/CurrencyInput";
import { removeCurrencyFormat } from "@/utils/currencyFormat";

type Props = {};

const AddNewWallet = (props: Props) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset } = useForm();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: createNewWallet,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.WALLETS], (oldData: any) => {
        return [data, ...oldData];
      });
      if (data.balance > 0) {
        queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);
        queryClient.invalidateQueries([QueryKey.RECENT_TRANSACTIONS]);
        queryClient.invalidateQueries([QueryKey.TRANSACTIONS]);
      }
      reset();
    },
  });

  const onSubmitHandler = (data: any) => {
    mutate({
      ...data,
      balance: removeCurrencyFormat(data.balance),
    });
  };

  return (
    <Modal>
      <ModalTrigger>
        <div className="dark:text-slate-800 font-medium text-slate-50 bg-slate-600 dark:bg-slate-50 px-3 py-2 rounded-lg w-auto">
          Tambah dompet
        </div>
      </ModalTrigger>
      <ModalContent>
        <div className="flex items-center justify-between">
          <Heading className="text-slate-700" level={3}>
            Tambah Dompet
          </Heading>
          <ModalCloseTringger>
            <IconWrapper className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20">
              <XmarkIcon />
            </IconWrapper>
          </ModalCloseTringger>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mt-8 space-y-5">
            <InputWithLabel
              label="Nama Dompet"
              id="wallet-name"
              type="text"
              placeholder="Dompet Utama"
              required
              {...register("name")}
            />
            <div className="flex md:items-center gap-5 flex-col md:flex-row">
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select
                    minWidth=" min-w-[6rem]"
                    required
                    placeholder="Warna"
                    {...field}
                  >
                    {Object.keys(indicatorColor).map((key: string) => (
                      <Option key={key} value={key}>
                        <div className="flex items-center gap-3 capitalize">
                          <ColorCircle
                            dataColor={(indicatorColor as any)[key]}
                          />
                          {key}
                        </div>
                      </Option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Saldo Awal (opsional)"
                    id="wallet-balance"
                    placeholder="Rp. 12000 (opsional)"
                    className="w-full"
                    {...field}
                  />
                )}
              />
            </div>
            <LoadingButton
              title="Tambah Dompet"
              isLoading={isLoading}
              onLoadingText="Menambahkan dompet"
              isSuccess={isSuccess}
              onSuccessText="Dompet berhasil ditambahkan"
            />
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddNewWallet;
