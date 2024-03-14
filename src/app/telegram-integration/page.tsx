import { Routes } from "@/types/Routes";
import Link from "next/link";
import * as Seo from "../seo";
import { FaTelegram } from "react-icons/fa";
import ClipboardIcon from "@/icons/ClipboardIcon";

export const metadata = {
  metadataBase: new URL("https://finaki.acml.me/"),
  title: "Finaki - Telegram Integration",
  keywords: [
    "finaki",
    "telegram",
    "integration",
    "bot",
    "finance",
    "management",
  ],
  description: Seo.desciprtion,
  openGraph: {
    title: "Finaki - Telegram Integration",
    description: Seo.desciprtion,
  },
  twitter: {
    title: "Finaki - Telegram Integration",
    description: Seo.desciprtion,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Finaki - Telegram Integration",
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
            <h1 className="2xl:text-8xl text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text">
              Integrasikan Akun Telegram Anda dengan Finaki
            </h1>
            <p className="xl:text-xl text-lg text-slate-600 dark:text-slate-300">
              Hubungkan akun Telegram Anda dengan Finaki untuk memudahkan dalam
              mencatat transaksi keuangan Anda.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center my-6">
            <Link
              className="block whitespace-nowrap rounded-lg px-7 py-4 w-fit font-semibold bg-blue-500 text-white shadow-xl shadow-blue-600/20"
              href={Routes.Register}
            >
              Daftar Sekarang
            </Link>
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
                    Finaki Bot
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-100">
                    Finaki Bot adalah bot yang dapat membantu Anda mencatat
                    transaksi keuangan Anda dengan mudah dan cepat melalui
                    Telegram Anda.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br p-5 mx-auto from-blue-500 to-cyan-500 relative w-fit">
                <FaTelegram size="100%" className="text-white" />
              </div>
            </div>
          </div>
        </section>
        <section className="overflow-hidden bg-white dark:bg-slate-700 rounded-lg lg:rounded-3xl py-16 mt-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-center tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-emerald-500">
              Cara menghubungkan
            </h2>
            <div className="mx-auto grid max-w-2xl grid-cols-1 border-l pl-5 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
              <ol className="space-y-10 text-slate-700 dark:text-slate-200 list-decimal pl-3">
                <li className="space-y-3 pl-2">
                  <p className="font-semibold">Daftar atau masuk ke Finaki</p>
                  <p>
                    Jika Anda belum memiliki akun, daftar terlebih dahulu. Jika
                    sudah memiliki akun, silahkan masuk.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-semibold">
                    Buka halaman Akun{" "}
                    <Link
                      className="font-base underline font-normal text-blue-500"
                      href={Routes.Account}
                    >
                      https://finaki.acml.me/app/account
                    </Link>
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-semibold">
                    Pada bagian{" "}
                    <span className="border p-1 rounded-md dark:border-slate-500 text-sm">
                      Informasi tentang akun
                    </span>{" "}
                    terdapat token, salin token tersebut, atau klik{" "}
                    <ClipboardIcon className="w-5 inline" />
                  </p>
                </li>
                <li className="pl-2 space-y-3">
                  <p className="font-semibold">Buka aplikasi Telegram</p>
                  <p>
                    Cari bot{" "}
                    <span className="border p-1 rounded-md dark:border-slate-500 text-sm">
                      Finaki
                    </span>{" "}
                    dengan username{" "}
                    <span className="border p-1 rounded-md dark:border-slate-500 text-sm">
                      @finaki_bot
                    </span>{" "}
                    kemudian mulai bot tersebut.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-semibold">
                    Jalankan perintah{" "}
                    <span className="border p-1 rounded-md dark:border-slate-500 text-sm">
                      /token
                    </span>{" "}
                    lalu tempelkan token yang telah Anda salin sebelumnya.
                  </p>
                </li>
                <li className="pl-2 space-y-3">
                  <p className="font-semibold">
                    Jika berhasil, Anda akan mendapatkan balasan dari bot bahwa
                    akun Anda berhasil terhubung.
                  </p>
                  <p>
                    Anda juga dapat melihat kembali di halaman{" "}
                    <Link
                      className="font-base underline font-normal text-blue-500"
                      href={Routes.Account}
                    >
                      Akun
                    </Link>{" "}
                    terdapat informasi tentang akun Telegram yang sedang
                    terhubung.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
            <h2 className="mb-6 text-3xl font-bold text-center tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-red-500 to-orange-400">
              Cara memutuskan
            </h2>
            <div className="mx-auto max-w-2xl pl-5 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
              <p>
                Pemutusan akun Telegram hanya dapat dilakukan di web, jadi Anda
                tidak bisa melakukannya melalui aplikasi Telegram langsung.
              </p>
              <p>
                Anda dapat mengunjungi halaman{" "}
                <Link
                  className="font-base underline font-normal text-blue-500"
                  href={Routes.Account}
                >
                  Akun
                </Link>{" "}
                klik tombol{" "}
                <span className="border p-1 rounded-md dark:border-slate-500 text-sm">
                  Putuskan Akun Telegram
                </span>{" "}
                di bagian paling bawah.
              </p>
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
