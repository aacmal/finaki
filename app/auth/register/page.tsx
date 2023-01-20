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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import classNames from "classnames";

type Props = {};

const RegisterPage = (props: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading, error, isSuccess } = useMutation(
    (userData: RegisterInput) => registerUser(userData),
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

  const onSubmitHandler = (values: any) => {
    mutate(values);
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
                  ? "Mendaftar"
                  : "Daftar"}
              </span>
            </div>
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
