"use client";

import ContentWrapper from "../../../components/Container/ContentWrapper";
import ThemeSelection from "../../../components/ThemeSelection/ThemeSelection";
import Heading from "../../../components/dls/Heading";
import { Routes } from "@/types/Routes";
import Link from "next/link";

const Page = () => {
  return (
    <div className="space-y-10 mt-6">
      <div>
        <Heading level={2}>Login untuk melihat profile anda</Heading>
        <ContentWrapper className="space-x-5">
          <Link
            href={Routes.Register}
            className="font-semibold px-4 py-2 rounded-lg border text-blue-500 border-blue-500"
          >
            Daftar
          </Link>
          <Link
            href={Routes.Login}
            className="font-semibold px-4 py-2 rounded-lg text-white bg-blue-500"
          >
            Masuk
          </Link>
        </ContentWrapper>
      </div>
      <ThemeSelection />
    </div>
  );
};

export default Page;
