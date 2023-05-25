"use client";

import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalContent } from "@/dls/Modal";
import ArrowIcon from "@/icons/ArrowIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { dateFormat, timeFormat } from "@/utils/timeFormat";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import transactionStore from "../../stores/transactionStore";
import { walletLabelColor } from "../WalletCard/constants";

type Props = {};

const TransactionDetail = (props: Props) => {
  const { setTransactionDetailState, transactionDetailState: {transaction, isOpen} } = transactionStore(
    (state) => ({
      setTransactionDetailState: state.setTransactionDetailState,
      transactionDetailState: state.transactionDetailState,
    })
  );
  const queryClient = useQueryClient();
  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];

  if (!wallets || !isOpen) return <></>;

  const wallet = wallets.find((wallet) => wallet._id === transaction?.walletId);

  return (
    <Modal stateOpen={isOpen || (transaction !== null)}>
      <ModalContent
        onClickOverlay={() => setTransactionDetailState({transaction: undefined, isOpen: false})}
        className="!max-w-2xl lg:!-mt-96"
      >
        <div className="flex justify-between items-center mb-5">
          <Heading level={3}>Detail Transaksi</Heading>
          <IconButton
            className="dark:text-slate-100"
            onClick={() => {
              setTransactionDetailState({transaction: undefined, isOpen: false});
            }}
          >
            <XmarkIcon />
          </IconButton>
        </div>
        <table className="dark:text-slate-200" cellPadding={5}>
          <tbody>
            <tr>
              <td className="pr-2 font-medium dark:text-slate-300">
                Deskripsi
              </td>
              <td className="w-5">:</td>
              <td>{transaction?.description}</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Nominal</td>
              <td>:</td>
              <td>{currencyFormat(transaction!.amount)}</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Tipe</td>
              <td>:</td>
              <td className="flex items-center gap-3">
                {transaction!.type === "in" ? (
                  <>
                    <IconWrapper className="!w-4 text-blue-500">
                      <ArrowIcon direction="up" strokeWidth={4} />
                    </IconWrapper>
                    Masuk
                  </>
                ) : (
                  <>
                    <IconWrapper className="!w-4 text-orange-500">
                      <ArrowIcon direction="down" strokeWidth={4} />
                    </IconWrapper>
                    Keluar
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Dompet</td>
              <td>:</td>
              <td>
                <div
                  className={classNames(
                    {
                      "px-3 py-1 w-fit text-center text-sm rounded-lg font-medium":
                        wallet,
                    },
                    `${wallet && (walletLabelColor as any)[wallet.color]}`
                  )}
                >
                  {wallet?.name ?? "-"}
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Catatan</td>
              <td>:</td>
              <td>
                {transaction!.note?.length > 0
                  ? transaction!.note
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Tanggal</td>
              <td>:</td>
              <td>
                {dateFormat(transaction!.createdAt)} - {timeFormat(transaction!.createdAt)}
              </td>
            </tr>
          </tbody>
        </table>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetail;
