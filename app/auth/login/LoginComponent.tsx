"use client";

import { LoginInput } from "@/api/types/AuthAPI";
import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import LoadingButton from "@/dls/Button/LoadingButton";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import { Routes } from "@/types/Routes";
import { loginUser } from "@/utils/api/authApi";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
          <span className="mx-auto text-red-400 font-semibold">
            {errors.root?.message}
          </span>
        )}
        <div>
          <Heading
            level={1}
            gradient
            className="text-center mt-2 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text"
          >
            Selamat Datang Kembali!
          </Heading>
          <Heading level={4} className="text-center font-medium mt-2">
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
              className="text-blue-400 block w-full mt-1 text-right font-semibold"
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
        <span className="text-center justify-self-end text-gray-600 dark:text-slate-300">
          Belum punya akun?{" "}
          <Link href={Routes.Register} className="text-blue-400 font-semibold">
            Daftar
          </Link>
        </span>
      </AuthCardContent>
    </AuthCard>
  );
};

export default LoginComponent;
