"use client";

import { resetPassword, verifyResetPasswordToken } from "@/api/authApi";
import AuthCard from "@/components/AuthCard/AuthCard";
import AuthCardContent from "@/components/AuthCard/AuthCardContent";
import LoadingButton from "@/dls/Button/LoadingButton";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import Image from "@/dls/Image";
import { Routes } from "@/types/Routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const verifyToken = useQuery({
    queryKey: ["verify-reset-password-token"],
    queryFn: () => verifyResetPasswordToken(searchParams!.get("token")!),
  });
  const { mutate, isLoading, isSuccess, error } = useMutation({
    mutationFn: resetPassword,
  });

  const searchParams = useSearchParams();

  const onSubmitHandler = (values: any) => {
    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", {
        message: "Password tidak sama",
      });
      return;
    }

    const token = searchParams!.get("token");
    if (!token) {
      toast.error("Tidak valid");
    }

    mutate({
      password: values.password,
      token: token!,
    });
  };

  useEffect(() => {
    document.title = "Reset Password";

    return () => {
      document.title = "Finaki";
    };
  }, []);

  if (!searchParams!.get("token")) {
    router.replace("/auth/login");
  }

  if (verifyToken.isLoading) {
    return (
      <div className="h-screen w-screen dark:text-slate-300 grid place-items-center font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <AuthCard>
      <Image
        src="/images/register_illustration.png"
        alt="Register Illustration"
        className="w-[40%] lg:w-[60%] aspect-square"
      />
      <AuthCardContent>
        {verifyToken.isError ? (
          <div className="my-auto">
            <Heading level={1} className="text-center mt-2 font-medium mb-5">
              Link reset password tidak valid atau sudah kadaluarsa, silahkan
              minta link reset password kembali
            </Heading>
            <Link
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-center block font-semibold text-slate-50"
              href={Routes.ForgotPassword}
            >
              Kembali ke lupa password
            </Link>
          </div>
        ) : (
          <>
            <Heading level={1} className="text-center mt-2">
              Reset Password
            </Heading>
            {isSuccess ? (
              <div className="flex flex-col gap-5 h-fit">
                <BsCheckCircle size={50} className="mx-auto text-green-500" />
                <p className="text-center font-semibold">
                  Password berhasil direset
                </p>
                <Link
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-center block font-semibold text-slate-50"
                  href={Routes.Login}
                >
                  Login
                </Link>
              </div>
            ) : (
              <>
                {error && <p>{(error as any).response.data.message}</p>}
                <FormGroup onSubmit={handleSubmit(onSubmitHandler)}>
                  <InputWithLabel
                    label="Password Baru"
                    type="password"
                    placeholder="Masukan password baru"
                    id="password"
                    required
                    {...register("password")}
                    error={errors.password as any}
                  />
                  <InputWithLabel
                    label="Konfirmasi Password Baru"
                    type="password"
                    placeholder="konfirmasi password"
                    id="confirmPassword"
                    required
                    {...register("confirmPassword")}
                    error={errors.confirmPassword as any}
                  />
                  <LoadingButton
                    isLoading={isLoading}
                    onLoadingText="Mereset password"
                    isSuccess={isSuccess}
                    onSuccessText="Password berhasil direset"
                    title="Reset Password"
                  />
                </FormGroup>
              </>
            )}
          </>
        )}
      </AuthCardContent>
    </AuthCard>
  );
};

export default ResetPasswordPage;
