import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import { Modal, ModalContent } from "@/dls/Modal";
import XmarkIcon from "@/icons/XmarkIcon";
import { QueryKey } from "@/types/QueryKey";
import { Transaction } from "@/types/Transaction";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useStore from "../../stores/store";
import ContentWrapper from "../Container/ContentWrapper";

type Props = {};

const TransactionDetail = (props: Props) => {
  const { setTransactionId, transactionId } = useStore(
    (state) => state.transactionDetailState
  );
  const queryClient = useQueryClient();
  const transactions = queryClient.getQueryData([
    QueryKey.RECENT_TRANSACTIONS,
  ]) as any[];

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  console.log("transactionId", transactionId);
  console.log("transactions", selectedTransaction);
  useEffect(() => {
    if (transactionId) {
      const selectedTransaction = transactions.find(
        (transaction) => transaction._id === transactionId
      );
      setSelectedTransaction(selectedTransaction);
    }
  }, [transactionId]);

  return (
    <Modal stateOpen={transactionId !== null}>
      <ModalContent>
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
        <div>
          <span>{selectedTransaction?.description}</span>
          <ContentWrapper className="!shadow-none">
            {selectedTransaction?.description}
          </ContentWrapper>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetail;
