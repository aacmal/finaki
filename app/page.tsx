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
          <h1 className=" 2xl:text-8xl text-5xl font-bold text-transparent bg-gradient-to-r tracking-tight from-violet-600 to-red-500 bg-clip-text">
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
        <div className="relative w-full lg:w-1/2 z-0">
          <Image
            className="rounded-xl overflow-hidden  hero-image z-0"
            src="/images/preview-dark.jpg"
            width={1104}
            height={849}
            alt="Preview Dark"
          />
          <Image
            className="rounded-xl overflow-hidden hero-image z-0"
            src="/images/preview-white.jpg"
            alt="Preview White"
            width={1104}
            height={849}
          />
        </div>
      </section>
      <section className="overflow-hidden bg-white rounded-lg lg:rounded-3xl py-24 mt-32 lg:mt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-5xl font-bold tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-blue-600 to-emerald-600">
                  Dilengkapi dengan Grafik Visual yang mudah dipahami
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
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
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 items-center lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4 z-20">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-5xl font-bold tracking-tight bg-clip-text bg-gradient-to-r text-transparent from-violet-300 to-blue-500">
                  Dark Mode
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-100">
                  Memberikan pengalaman yang lebih baik dengan mode gelap yang
                  dapat diaktifkan atau dinonaktifkan sesuai keinginan Anda.
                </p>
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Coba Sekarang
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Demo <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="p-px rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 relative w-fit">
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
      <section className="my-10 p-3 rounded-lg text-center bg-white dark:bg-slate-700 dark:text-white font-medium">
        <h2>
          Dibuat dengan <span className="text-red-500">❤</span> oleh{" "}
          <a className="text-blue-500" target="_blank" href="https://acmal.me">
            Acmal
          </a>
        </h2>
      </section>
    </div>
  );
}
