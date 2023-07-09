"use client";

import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import { Routes } from "@/types/Routes";
import { registerUser } from "@/utils/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "@/dls/Button/LoadingButton";
import { RegisterInput } from "@/api/types/AuthAPI";

type Props = {};

const RegisterComponent = (props: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading, error, isSuccess, data } = useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      const errors = (error as any).response.data.errors;

      errors.forEach(({ msg, param }: any) => {
        setError(param, { message: msg }, { shouldFocus: true });
      });
    },
  });

  const onSubmitHandler = (values: any) => {
    mutate(values as RegisterInput);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access-token", data.accessToken);
      router.push(Routes.App);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
            error={errors.email as any}
          />
          <InputWithLabel
            label="Nama"
            id="nama"
            type="text"
            placeholder="Nama Lengkap"
            minLength={5}
            required
            {...register("name")}
            error={errors.name as any}
          />
          <InputWithLabel
            label="Password"
            id="password"
            type="password"
            placeholder="*******"
            minLength={5}
            required
            {...register("password")}
            error={errors.password as any}
          />
          <LoadingButton
            loadingOnSuccess
            isLoading={isLoading}
            onLoadingText="Mendaftar"
            isSuccess={isSuccess}
            onSuccessText="Sedang dialihkan"
            title="Daftar"
          />
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

export default RegisterComponent;
