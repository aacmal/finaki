"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterInput } from "@/api/types/AuthAPI";
import { Routes } from "@/types/Routes";
import { registerUser } from "@/utils/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import AuthCard from "../../../components/AuthCard/AuthCard";
import AuthCardContent from "../../../components/AuthCard/AuthCardContent";
import LoadingButton from "../../../components/dls/Button/LoadingButton";
import FormGroup from "../../../components/dls/Form/FormGroup";
import InputWithLabel from "../../../components/dls/Form/InputWithLabel";
import Heading from "../../../components/dls/Heading";
import LoginWithGoogle from "../LoginWithGoogle";

const RegisterComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading, isSuccess, data } = useMutation({
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
    <AuthCard
      imageAlt="Register Illustration"
      imageUrl="/images/register_illustration.png"
    >
      <AuthCardContent>
        {errors.root && (
          <span className="mx-auto font-semibold text-red-400">
            {errors.root?.message}
          </span>
        )}
        <div>
          <Heading
            level={1}
            gradient
            className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-transparent"
          >
            Selamat Datang!
          </Heading>
          <Heading level={4} className="mt-2 text-center font-medium">
            Masukan informasi personal Anda
          </Heading>
        </div>
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
        <hr className="dark:border-slate-400" />
        <LoginWithGoogle
          onError={(message) =>
            setError("root", {
              message: message,
            })
          }
        />
        <span className="justify-self-end text-center text-gray-600 dark:text-slate-300">
          Sudah punya akun?{" "}
          <Link href={Routes.Login} className="font-semibold text-blue-400">
            Login
          </Link>
        </span>
      </AuthCardContent>
    </AuthCard>
  );
};

export default RegisterComponent;
