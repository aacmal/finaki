"use client";

import React from "react";
import ThemeSelection from "@/components/ThemeSelection/ThemeSelection";
import Heading from "@/dls/Heading";
import ContentWrapper from "@/components/Container/ContentWrapper";
import Link from "next/link";
import { Routes } from "@/types/Routes";

type Props = {};

const Page = (props: Props) => {
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
