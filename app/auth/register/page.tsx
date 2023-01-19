"use client";

import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import Button from "@/dls/Button/Button";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import { Routes } from "@/types/Routes";
import { RegisterInput, registerUser } from "@/utils/api/authApi";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const RegisterPage = (props: Props) => {
  const { register, handleSubmit } = useForm();

  // const { mutate, isLoading, error } = useMutation(
  //   (userData: RegisterInput) => registerUser(userData),
  //   {
  //     onSuccess: (data) => {
  //       console.log("success");
  //       console.log(data);
  //     },
  //     onError: (error) => {
  //       console.log("error");
  //       console.log(error);
  //     },
  //   }
  // );

  const registerUserToBacked = (userData: RegisterInput) => {
    registerUser(userData)
      .then((data) => {
        console.log("success");
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHandler = (values: any) => {
    console.log(values);
    registerUserToBacked(values);
  };

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
        <FormGroup onSubmit={handleSubmit(onSubmitHandler)}>
          <InputWithLabel
            label="Email"
            id="email"
            type="email"
            placeholder="contoh@mail.com"
            minLength={5}
            required
            {...register("email")}
          />
          <InputWithLabel
            label="Nama"
            id="nama"
            type="text"
            placeholder="Nama Lengkap"
            minLength={5}
            required
            {...register("name")}
          />
          <InputWithLabel
            label="Password"
            id="password"
            type="password"
            placeholder="*******"
            minLength={5}
            required
            {...register("password")}
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
