"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword, verifyResetPasswordToken } from "@/api/authApi";
import { Routes } from "@/types/Routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";

import AuthCard from "../../../components/AuthCard/AuthCard";
import AuthCardContent from "../../../components/AuthCard/AuthCardContent";
import LoadingButton from "../../../components/dls/Button/LoadingButton";
import FormGroup from "../../../components/dls/Form/FormGroup";
import InputWithLabel from "../../../components/dls/Form/InputWithLabel";
import Heading from "../../../components/dls/Heading";

const ResetPasswordPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
      <div className="grid h-screen w-screen place-items-center font-semibold dark:text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <AuthCard
      imageUrl="/images/register_illustration.png"
      imageAlt="Register Illustration"
    >
      <AuthCardContent>
        {verifyToken.isError ? (
          <div className="my-auto">
            <Heading level={1} className="mb-5 mt-2 text-center font-medium">
              Link reset password tidak valid atau sudah kadaluarsa, silahkan
              minta link reset password kembali
            </Heading>
            <Link
              className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-center font-semibold text-slate-50"
              href={Routes.ForgotPassword}
            >
              Kembali ke lupa password
            </Link>
          </div>
        ) : (
          <>
            <Heading
              gradient
              level={1}
              className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-center text-transparent dark:from-purple-300 dark:to-blue-400"
            >
              Reset Password
            </Heading>
            {isSuccess ? (
              <div className="flex h-fit flex-col gap-5">
                <BsCheckCircle size={50} className="mx-auto text-green-500" />
                <p className="text-center font-semibold">
                  Password berhasil direset
                </p>
                <Link
                  className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-center font-semibold text-slate-50"
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
