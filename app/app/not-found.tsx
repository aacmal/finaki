import Heading from "@/dls/Heading";
import { Routes } from "@/types/Routes";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Image
        src="/images/not-found.png"
        width={500}
        height={500}
        alt="Not Found Image"
      />
      <Heading level={2} className="!text-xl">
        Ups! Ada yang salah
      </Heading>
      <Link
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mt-5 font-semibold text-slate-50"
        href={Routes.Dashboard}
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
