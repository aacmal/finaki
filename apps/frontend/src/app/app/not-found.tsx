import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/types/Routes";

import Heading from "../../components/dls/Heading";

const NotFound = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
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
        className="mt-5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-semibold text-slate-50"
        href={Routes.Dashboard}
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
