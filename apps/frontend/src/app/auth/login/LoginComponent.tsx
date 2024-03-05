"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/api/types/AuthAPI";
import { Routes } from "@/types/Routes";
import { loginUser } from "@/utils/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import AuthCard from "../../../components/AuthCard/AuthCard";
import AuthCardContent from "../../../components/AuthCard/AuthCardContent";
import LoadingButton from "../../../components/dls/Button/LoadingButton";
import FormGroup from "../../../components/dls/Form/FormGroup";
import InputWithLabel from "../../../components/dls/Form/InputWithLabel";
import Heading from "../../../components/dls/Heading";
import LoginWithGoogle from "../LoginWithGoogle";

const LoginComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      const errors = (error as any).response.data.errors;

      errors.forEach(({ msg, param }: any) => {
        setError(param, { message: msg }, { shouldFocus: true });
      });
    },
  });

  function onSubmitHandler(values: any) {
    mutate(values as LoginInput);
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.App);
      localStorage.setItem("access-token", data.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <AuthCard
      imageUrl="/images/login_illustration.png"
      imageAlt="Register Illustration"
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
            Selamat Datang Kembali!
          </Heading>
          <Heading level={4} className="mt-2 text-center font-medium">
            Login untuk melanjutkan penggunaan aplikasi
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
            error={errors.email as any}
            {...register("email")}
          />
          <div>
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
            <Link
              href={Routes.ForgotPassword}
              className="mt-1 block w-full text-right font-semibold text-blue-400"
            >
              Lupa password?
            </Link>
          </div>
          <LoadingButton
            loadingOnSuccess
            isLoading={isLoading}
            onLoadingText="Sedang Memproses"
            isSuccess={isSuccess}
            onSuccessText="Sedang dialihkan"
            title="Login"
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
          Belum punya akun?{" "}
          <Link href={Routes.Register} className="font-semibold text-blue-400">
            Daftar
          </Link>
        </span>
      </AuthCardContent>
    </AuthCard>
  );
};

export default LoginComponent;
