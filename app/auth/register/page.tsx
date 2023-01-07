"use client";

import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import Button from "@/dls/Button/Button";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import { Routes } from "@/types/Routes";
import Link from "next/link";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("registered");
  }

  return (
    <AuthCard>
      <Image
        src="/images/register_illustration.png"
        alt="Register Illustration"
        className="w-[40%] lg:w-[60%] aspect-square"
      />
      <AuthCardContent>
        <Heading level={1} className="text-center mt-2">
          Selamat Datang!
        </Heading>
        <FormGroup onSubmit={onSubmitHandler}>
          <InputWithLabel
            label="Email"
            id="email"
            type="email"
            placeholder="contoh@mail.com"
            minLength={5}
            required
          />
          <InputWithLabel
            label="Password"
            id="password"
            type="password"
            placeholder="masukan password anda"
            minLength={5}
            required
          />
          <Button width="full" type="submit" className="!mt-16">
            Daftar
          </Button>
        </FormGroup>
        <span className="text-center justify-self-end text-gray-600 dark:text-slate-300">
          Sudah punya akun?{" "}
          <Link href={Routes.Login} className="text-blue-500">
            Login
          </Link>
        </span>
      </AuthCardContent>
    </AuthCard>
  );
};

export default RegisterPage;
