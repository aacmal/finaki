import { getAllTransactionByMonth } from "@/api/transaction";
import LoadingButton from "@/dls/Button/LoadingButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalContent } from "@/dls/Modal";
import XmarkIcon from "@/icons/XmarkIcon";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "@/types/Transaction";
import { currencyFormat, removeCurrencyFormat } from "@/utils/currencyFormat";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExportTransactionModal = ({ isOpen, setIsOpen }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date());
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
    },
  });

  const generatePDF = (data: any) => {
    let doc = new jsPDF("p", "pt");

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
          desription: transaction.description,
          tipe: transaction.type === "in" ? "Masuk" : "Keluar",
          nominal: currencyFormat(transaction.amount),
          dompet: transaction.wallet ? transaction.wallet.name : "-",
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
        };
      }
    );

    const totalIn = transactions.reduce((acc: any, curr: any) => {
      if (curr.tipe === "Masuk") {
        return acc + removeCurrencyFormat(curr.nominal);
      }
      return acc;
    }, 0);

    const totalOut = transactions.reduce((acc: any, curr: any) => {
      if (curr.tipe === "Keluar") {
        return acc + removeCurrencyFormat(curr.nominal);
      }
      return acc;
    }, 0);

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
        { header: "Deskripsi", dataKey: "desription" },
        { header: "Tipe", dataKey: "tipe" },
        { header: "Nominal", dataKey: "nominal" },
        { header: "Dompet", dataKey: "dompet" },
        { header: "Tanggal", dataKey: "tanggal" },
      ],
      willDrawCell: (data) => {
        if ((data.row.section === "body", data.column.dataKey === "tipe")) {
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
          `Transaksi Bulan ${new Date(date!).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}`,
          data.settings.margin.left + 15,
          22
        );
      },
    });
    doc.save("table.pdf");
  };

  const handleDownload = () => {
    if (!date) return;
    mutate(date);
  };
  return (
    <Modal stateOpen={isOpen}>
      <ModalContent onClickOverlay={() => setIsOpen(false)}>
        <div className="flex items-center justify-between">
          <Heading level={3}>Export Ke PDF</Heading>
          <IconWrapper
            onClick={() => setIsOpen(false)}
            className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20"
          >
            <XmarkIcon />
          </IconWrapper>
        </div>
        <span className="mt-5 font-semibold block dark:text-slate-200">
          Pilih Bulan
        </span>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          className="w-full mt-1 mb-5 p-3 bg-slate-100 dark:bg-slate-500 dark:text-slate-200 rounded-lg"
        />
        <LoadingButton
          onClick={handleDownload}
          disabled={!date || isLoading}
          isLoading={isLoading}
          title="Download"
          onLoadingText="Sedang diproses"
        />
      </ModalContent>
    </Modal>
  );
};

export default ExportTransactionModal;
