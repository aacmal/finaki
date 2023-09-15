import { getAllTransactionByMonth } from "@/api/transaction";
import LoadingButton from "@/dls/Button/LoadingButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalContent } from "@/dls/Modal";
import XmarkIcon from "@/icons/XmarkIcon";
import { Transaction } from "@/types/Transaction";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation } from "@tanstack/react-query";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExportTransactionModal = ({ isOpen, setIsOpen }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: getAllTransactionByMonth,
    onSuccess: (data) => {
      generatePDF(data[0]);
    },
    onError: (error) => {
      setError(
        "Terjadi kesalahan atau tidak ada transaksi pada bulan yang dipilih"
      );
      console.log(error);
    },
  });

  const generatePDF = (data: any) => {
    const doc = new JsPDF("p", "pt");

    const date = new Date(data.timestamp);
    const transactions = data.transactions.map(
      (
        transaction: Transaction & {
          wallet: {
            name: string;
          };
        },
        index: number
      ) => {
        return {
          no: (index + 1).toString(),
          tanggal: new Date(transaction.createdAt)
            .toLocaleDateString("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
            .replace("pukul", "-"),
          desription: transaction.description,
          tipe: transaction.type === "in" ? "Masuk" : "Keluar",
          nominal: currencyFormat(transaction.amount),
          dompet: transaction.wallet ? transaction.wallet.name : "-",
        };
      }
    );

    autoTable(doc, {
      columnStyles: {
        no: { halign: "center" },
        dompet: {
          halign: "center",
        },
      },
      body: transactions,
      columns: [
        { header: "No", dataKey: "no" },
        { header: "Tanggal", dataKey: "tanggal" },
        { header: "Deskripsi", dataKey: "desription" },
        { header: "Tipe", dataKey: "tipe" },
        { header: "Nominal", dataKey: "nominal" },
        { header: "Dompet", dataKey: "dompet" },
      ],
      willDrawCell: (data) => {
        if (data.row.section === "body" && data.column.dataKey === "tipe") {
          if (data.cell.raw === "Masuk") {
            doc.setTextColor("#10B981");
          } else if (data.cell.raw === "Keluar") {
            doc.setTextColor("#EF4444");
          }
        }
      },
      willDrawPage: (data) => {
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(
          `Transaksi Bulan ${date.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}`,
          data.settings.margin.left + 15,
          22
        );
      },
    });

    doc.save(
      `data transaksi ${date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })}.pdf`
    );
  };

  const fetchTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.month.value;
    if (!value) {
      setError("Bulan tidak boleh kosong");
      return;
    }
    setError(null);
    console.log(value);
    mutate(new Date(value));
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <Modal stateOpen={isOpen}>
      <ModalContent onClickOverlay={closeModal}>
        <div className="flex items-center justify-between">
          <Heading level={3}>Export Ke PDF</Heading>
          <IconWrapper
            onClick={closeModal}
            className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20"
          >
            <XmarkIcon />
          </IconWrapper>
        </div>
        <span className="mt-5 font-semibold block dark:text-slate-200">
          Pilih Bulan
        </span>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        <form onSubmit={fetchTransaction}>
          <input
            type="month"
            placeholder="Pilih Bulan"
            className="w-full mt-1 mb-5 p-3 bg-slate-100 dark:bg-slate-500 dark:text-slate-200 rounded-lg"
            name="month"
          />
          <LoadingButton
            disabled={isLoading}
            isLoading={isLoading}
            title="Download"
            onLoadingText="Sedang diproses"
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ExportTransactionModal;
