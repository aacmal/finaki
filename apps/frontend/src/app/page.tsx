import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/types/Routes";

import * as Seo from "./seo";

export const metadata = {
  metadataBase: new URL("https://finaki.acml.me/"),
  title: Seo.title,
  keywords: Seo.keywords,
  description: Seo.desciprtion,
  openGraph: {
    title: Seo.title,
    description: Seo.desciprtion,
  },
  twitter: {
    title: Seo.title,
    description: Seo.desciprtion,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Seo.title,
  url: metadata.metadataBase.href,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-32 overflow-x-hidden px-1 md:px-4 lg:pt-16 2xl:px-32">
        <section className="flex flex-col items-center px-3 text-center md:px-1">
          <div className="max-w-screen-xl space-y-8 xl:space-y-14">
            <p className="text-base font-medium text-slate-800 dark:text-slate-200 xl:text-xl">
              Selamat datang di Finaki
            </p>
            <h1 className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent 2xl:text-8xl">
              Atur Keuangan Anda Dengan Mudah, Cepat, dan Efektif
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 xl:text-xl">
              Aplikasi Manajemen Keuangan All-in-One yang Membantu Anda Mengatur
              Pengeluaran, Pendapatan, dan Tabungan dengan Mudah dan Efisien
            </p>
          </div>
          <div className="my-6 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-fit whitespace-nowrap rounded-lg bg-blue-500 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/20"
              href={Routes.Register}
            >
              Daftar Sekarang
            </Link>
            <Link
              className="block w-fit whitespace-nowrap rounded-lg border border-blue-500 px-7 py-4 font-semibold text-blue-500 shadow-xl shadow-blue-600/20"
              href={Routes.About}
            >
              Tentang Finaki
            </Link>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/desktop-preview.jpg"
              alt="Product screenshot"
              width={1440}
              height={1024}
              style={{
                objectFit: "cover",
              }}
              className="mt-10 rounded-xl shadow-xl ring-1 ring-gray-400/10 dark:shadow-stone-100/30"
            />
            <Image
              src="/images/mobile-preview.jpg"
              alt="Product screenshot"
              width={768}
              height={1024}
              style={{
                objectFit: "cover",
              }}
              className="-ml-20 mt-10 h-3/4 w-1/5 max-w-xs rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
        </section>
        <section className="mt-32 overflow-hidden rounded-lg bg-white py-24 dark:bg-slate-700 lg:mt-44 lg:rounded-3xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="mt-2 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                    Dilengkapi dengan Grafik Visual yang mudah dipahami
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-200">
                    Finaki menawarkan grafik visual yang mudah dipahami, yang
                    memungkinkan Anda untuk melacak perkembangan keuangan Anda
                    secara efisien dan efektif. Grafik ini dirancang untuk
                    menyajikan data keuangan Anda dengan cara yang jelas dan
                    ringkas, sehingga Anda dapat dengan cepat mengidentifikasi
                    pola dan tren yang penting untuk pengambilan keputusan.
                  </p>
                </div>
              </div>
              <Image
                src="/images/finaki-graph.jpg"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </section>
        <section className="relative mt-10 overflow-hidden rounded-lg bg-gray-900 py-24 lg:mt-10 lg:rounded-3xl">
          <div className="isolate">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#06b6d4" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <div className="z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="z-20 lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                    Dark Mode
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-100">
                    Memberikan pengalaman yang lebih baik dengan mode gelap yang
                    dapat diaktifkan atau dinonaktifkan sesuai keinginan Anda.
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Link
                    href={Routes.Register}
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Coba Sekarang
                  </Link>
                  <Link
                    href={Routes.Demo}
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Demo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="relative w-fit rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-px">
                <Image
                  src="/images/wallet-dark.jpg"
                  alt="Dark Mode Wallet"
                  className="z-20 w-[48rem] max-w-none rounded-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  width={2432}
                  height={1442}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="my-10 rounded-lg bg-white p-3 text-center font-medium dark:bg-slate-700 dark:text-white">
          <h2>
            Dibuat dengan <span className="text-red-500">❤</span> oleh{" "}
            <Link
              className="text-blue-500"
              target="_blank"
              href="https://acml.me"
            >
              Acmal
            </Link>
          </h2>
        </section>
      </div>
    </>
  );
}
