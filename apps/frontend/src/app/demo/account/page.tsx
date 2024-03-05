"use client";

import Link from "next/link";
import { Routes } from "@/types/Routes";

import ContentWrapper from "../../../components/Container/ContentWrapper";
import Heading from "../../../components/dls/Heading";
import ThemeSelection from "../../../components/ThemeSelection/ThemeSelection";

const Page = () => {
  return (
    <div className="mt-6 space-y-10">
      <div>
        <Heading level={2}>Login untuk melihat profile anda</Heading>
        <ContentWrapper className="space-x-5">
          <Link
            href={Routes.Register}
            className="rounded-lg border border-blue-500 px-4 py-2 font-semibold text-blue-500"
          >
            Daftar
          </Link>
          <Link
            href={Routes.Login}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
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
