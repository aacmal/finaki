import Button from "@/dls/Button/Button";
// import Image from "@/dls/Image";
import { Routes } from "@/types/Routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-32 2xl:px-32 px-4 ">
      <p className="text-base xl:text-xl text-slate-500 dark:text-slate-300">
        Selamat datang di Finaki
      </p>
      <section className="flex justify-between items-center gap-10 lg:gap-8 flex-col lg:flex-row">
        <div className="lg:w-1/2 space-y-8 xl:space-y-14">
          <h1 className=" 2xl:text-8xl text-5xl font-bold text-slate-700 dark:text-slate-100">
            Atur Keuangan Anda Dengan Mudah, Cepat, dan Efektif
          </h1>
          <p className="xl:text-xl text-lg text-slate-600 dark:text-slate-300">
            Aplikasi Manajemen Keuangan All-in-One yang Membantu Anda Mengatur
            Pengeluaran, Pendapatan, dan Tabungan dengan Mudah dan Efisien
          </p>
          <Link
            href={Routes.Register}
            className="px-10 py-3 w-full lg:w-44 lg:py-5 text-center rounded-lg text-white bg-blue-500 font-medium"
            type="button"
          >
            Daftar
          </Link>
        </div>
        <div className="relative w-full lg:w-1/2">
          {/* <Image
            className="max-w-[1104px] "
            src="/images/preview-dark.jpg"
            alt="Preview Dark"
          /> */}
          {/* <Image
            className="2xl:w-[1104px] 2xl:h-[849px] h-[calc(849px/3)] w-[calc(1104px/3)]  hero-image"
            src="/images/preview-white.jpg"
            alt="Preview White"
          /> */}
          <Image
            className="rounded-xl overflow-hidden  hero-image"
            src="/images/preview-dark.jpg"
            width={1104}
            height={849}
            alt="Preview Dark"
          />
          <Image
            className="rounded-xl overflow-hidden hero-image"
            src="/images/preview-white.jpg"
            alt="Preview White"
            width={1104}
            height={849}
          />
        </div>
      </section>
    </div>
  );
}
