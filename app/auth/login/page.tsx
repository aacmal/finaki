import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import React from "react";

type Props = {};

// TODO: Refactor this component

const LoginPage = (props: Props) => {
  return (
    <div className="flex flex-col lg:flex-row items-center h-full">
      <Image
        src="/images/register_illustration.png"
        alt="Register Illustration"
        className="w-[40%] lg:w-[60%] aspect-square"
      />
      <div className="flex flex-col justify-evenly pb-10 lg:pt-16 px-6 md:px-10 w-full lg:gap-0 gap-9 lg:w-[40%] h-fit lg:h-full">
        <Heading className="text-center mt-2 lg:mt-16">Selamat Datang!</Heading>
        <form action="">
          <div className=" space-y-10">
            <InputWithLabel
              label="Email"
              id="email"
              type="email"
              placeholder="contoh@mail.com"
            />
            <InputWithLabel
              label="Password"
              id="password"
              type="password"
              placeholder="masukan password anda"
            />
            <button
              className="px-4 py-4 w-full bg-blue-500 rounded-xl text-white transition-all hover:shadow-2xl hover:shadow-blue-200"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <span className="text-center justify-self-end text-gray-600">
          Belum punya akun? <span className="text-blue-500">Daftar</span>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
