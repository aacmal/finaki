import Heading from "@/dls/Heading";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Not Found",
  description: "Halaman tidak ditemukan",
};

const NotFound = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-center h-screen justify-center">
      <Image
        src="/images/not-found.png"
        width={500}
        height={500}
        alt="Not Found Image"
      />
      <Heading level={1} className="!text-3xl">
        Ups! Ada yang salah
      </Heading>
      <Link
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mt-5 font-semibold text-slate-50"
        href="/"
      >
        Kembali ke Home
      </Link>
    </div>
  );
};

export default NotFound;
