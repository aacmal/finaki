import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Heading from "../components/dls/Heading";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Halaman tidak ditemukan",
};

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
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
        className="mt-5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-semibold text-slate-50"
        href="/"
      >
        Kembali ke Home
      </Link>
    </div>
  );
};

export default NotFound;
