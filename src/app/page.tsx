import { Routes } from "@/types/Routes";
import Image from "next/image";
import Link from "next/link";
import * as Seo from "./seo";
import { FaTelegram } from "react-icons/fa";

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
      <div className="mt-32 lg:pt-16 2xl:px-32 px-1 md:px-4 overflow-x-hidden">
        <section className="px-3 md:px-1 flex flex-col items-center text-center">
          <div className="space-y-8 xl:space-y-14 max-w-screen-xl">
            <p className="text-base xl:text-xl text-slate-800 font-medium dark:text-slate-200">
              Selamat datang di Finaki
            </p>
            <h1 className=" 2xl:text-8xl text-5xl font-bold text-transparent bg-gradient-to-r tracking-tight from-cyan-400 to-blue-500 bg-clip-text">
              Atur Keuangan Anda Dengan Mudah, Cepat, dan Efektif
            </h1>
            <p className="xl:text-xl text-lg text-slate-600 dark:text-slate-300">
              Aplikasi Manajemen Keuangan All-in-One yang Membantu Anda Mengatur
              Pengeluaran, Pendapatan, dan Tabungan dengan Mudah dan Efisien
            </p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center my-6">
            <Link
              className="block whitespace-nowrap rounded-lg px-7 py-4 w-fit font-semibold bg-blue-500 text-white shadow-xl shadow-blue-600/20"
              href={Routes.Register}
            >
              Daftar Sekarang
            </Link>
            <Link
              className="block whitespace-nowrap rounded-lg px-7 py-4 w-fit font-semibold border border-blue-500 text-blue-500 shadow-xl shadow-blue-600/20"
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
              className="rounded-xl shadow-xl dark:shadow-stone-100/30 ring-1 ring-gray-400/10 mt-10"
            />
            <Image
              src="/images/mobile-preview.jpg"
              alt="Product screenshot"
              width={768}
              height={1024}
              style={{
                objectFit: "cover",
              }}
              className="rounded-xl shadow-xl w-1/5 max-w-xs h-3/4 -ml-20 ring-1 ring-gray-400/10 mt-10"
            />
          </div>
        </section>
        <section className="overflow-hidden bg-white dark:bg-slate-700 rounded-lg lg:rounded-3xl py-24 mt-32 lg:mt-44">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="mt-2 text-5xl font-bold tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-emerald-500">
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
        <section className="overflow-hidden relative bg-gray-900 rounded-lg lg:rounded-3xl py-24 mt-10 lg:mt-10">
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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4 z-20">
                <div className="lg:max-w-lg">
                  <h2 className="mt-2 text-5xl font-bold tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-cyan-500">
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
              <div className="p-px rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 relative w-fit">
                <Image
                  src="/images/wallet-dark.jpg"
                  alt="Dark Mode Wallet"
                  className="w-[48rem] max-w-none sm:w-[57rem] rounded-xl md:-ml-4 lg:-ml-0 z-20"
                  width={2432}
                  height={1442}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="overflow-hidden relative bg-gray-900 rounded-lg lg:rounded-3xl py-24 mt-10 lg:mt-10">
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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4 z-20">
                <div className="lg:max-w-lg">
                  <h2 className="mb-7 h-32 text-5xl font-bold tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-cyan-500">
                    Integrasikan dengan bot Telegram
                  </h2>
                  <Link
                    href="telegram-integration"
                    className="rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Coba Sekarang
                  </Link>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br p-5 mx-auto from-blue-500 to-cyan-500 relative w-fit">
                <FaTelegram size="100%" className="text-white" />
              </div>
            </div>
          </div>
        </section>
        <section className="my-10 p-3 rounded-lg text-center bg-white dark:bg-slate-700 dark:text-white font-medium">
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
