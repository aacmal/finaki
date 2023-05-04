"use client";

import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalContent } from "@/dls/Modal";
import ArrowIcon from "@/icons/ArrowIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import { QueryKey } from "@/types/QueryKey";
import { Transaction } from "@/types/Transaction";
import { WalletData } from "@/types/Wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useEffect, useState } from "react";
import useStore from "../../stores/store";
import ContentWrapper from "../Container/ContentWrapper";
import { walletLabelColor } from "../WalletCard/constants";

type Props = {};

const TransactionDetail = (props: Props) => {
  const { setTransactionId, transactionId } = useStore(
    (state) => state.transactionDetailState
  );
  const queryClient = useQueryClient();
  const transactions = queryClient.getQueryData([
    QueryKey.TRANSACTIONS,
  ]) as any[];
  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    if (transactionId) {
      const selectedTransaction = transactions.find(
        (transaction) => transaction._id === transactionId
      );
      setSelectedTransaction(selectedTransaction);
    }
  }, [transactionId]);

  if (!selectedTransaction) return <></>;

  const wallet = wallets.find(
    (wallet) => wallet._id === selectedTransaction.walletId
  );
  const date = new Date(selectedTransaction.createdAt).toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const time = new Date(selectedTransaction.createdAt).toLocaleTimeString(
    Intl.DateTimeFormat().resolvedOptions().locale,
    {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }
  );

  return (
    <Modal stateOpen={transactionId !== null}>
      <ModalContent
        onClickOverlay={() => setTransactionId(null)}
        className="!max-w-2xl lg:!-mt-96"
      >
        <div className="flex justify-between items-center mb-5">
          <Heading level={3}>Detail Transaksi</Heading>
          <IconButton
            className="dark:text-slate-100"
            onClick={() => {
              setTransactionId(null);
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
              <td>{selectedTransaction?.description}</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Nominal</td>
              <td>:</td>
              <td>{currencyFormat(selectedTransaction.amount)}</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Tipe</td>
              <td>:</td>
              <td className="flex items-center gap-3">
                {selectedTransaction.type === "in" ? (
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
                {selectedTransaction.note?.length > 0
                  ? selectedTransaction.note
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-slate-300">Tanggal</td>
              <td>:</td>
              <td>
                {date} - {time}
              </td>
            </tr>
          </tbody>
        </table>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetail;
