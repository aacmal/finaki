"use client";

import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import Button from "@/dls/Button/Button";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import { Routes } from "@/types/Routes";
import { LoginInput, loginUser } from "@/utils/api/authApi";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading, error, isSuccess } = useMutation(
    (userData: LoginInput) => loginUser(userData),
    {
      onSuccess: (res) => {
        localStorage.setItem("access-token", res.data.access_token);
        router.push(Routes.App);
      },
      onError: (error) => {
        console.log((error as any).response.data.errors);
        const errors = (error as any).response.data.errors;

        errors.forEach(({ msg, param }: any) => {
          setError(param, { message: msg }, { shouldFocus: true });
        });
      },
    }
  );

  function onSubmitHandler(values: any) {
    mutate(values);
  }

  return (
    <AuthCard>
      <Image
        src="/images/login_illustration.png"
        alt="Register Illustration"
        className="w-[40%] lg:w-[60%] aspect-square"
      />
      <AuthCardContent>
        <Heading level={1} className="text-center mt-2">
          Selamat Datang Kembali!
        </Heading>
        <FormGroup onSubmit={handleSubmit(onSubmitHandler)}>
          <InputWithLabel
            label="Email"
            id="email"
            type="email"
            placeholder="contoh@mail.com"
            minLength={5}
            required
            error={errors.email as any}
            {...register("email")}
          />
          <InputWithLabel
            label="Password"
            id="password"
            type="password"
            placeholder="masukan password anda"
            minLength={5}
            required
            error={errors.password as any}
            {...register("password")}
          />
          <Button
            disabled={isLoading}
            width="full"
            type="submit"
            className="!mt-16"
          >
            <div className="flex items-center justify-center">
              <LoadingSpinner
                className={classNames(
                  "transition-all duration-500",
                  {
                    "max-w-0 mr-0": !isLoading && !isSuccess,
                    "max-w-xs mr-3": isLoading,
                  },
                  { "max-w-xs mr-3": isSuccess }
                )}
              />
              <span>
                {isSuccess
                  ? "Sedang dialihkan"
                  : isLoading
                  ? "Sedang Memproses"
                  : "Login"}
              </span>
            </div>
          </Button>
        </FormGroup>
        <span className="text-center justify-self-end text-gray-600 dark:text-slate-300">
          Belum punya akun?{" "}
          <Link href={Routes.Register} className="text-blue-500">
            Daftar
          </Link>
        </span>
      </AuthCardContent>
    </AuthCard>
  );
};

export default LoginPage;
