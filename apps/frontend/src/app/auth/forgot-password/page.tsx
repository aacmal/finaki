"use client";

import { useEffect } from "react";
import { forgotPassword } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";

import AuthCard from "../../../components/AuthCard/AuthCard";
import LoadingButton from "../../../components/dls/Button/LoadingButton";
import FormGroup from "../../../components/dls/Form/FormGroup";
import InputWithLabel from "../../../components/dls/Form/InputWithLabel";
import Heading from "../../../components/dls/Heading";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Email terkirim");
    },
    onError: (error) => {
      const errors = (error as any).response.data.errors as [];
      errors.forEach(({ msg, param }: any) => {
        setError(param, { message: msg }, { shouldFocus: true });
      });
    },
  });

  const onSubmitHandler = (values: any) => {
    const { email } = values;
    mutate(email);
  };

  useEffect(() => {
    document.title = "Lupa Password";

    return () => {
      document.title = "Finaki";
    };
  }, []);

  return (
    <AuthCard className="!max-w-lg !p-5 !py-8 lg:!h-fit lg:!flex-col">
      <FormGroup
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full space-y-5 "
      >
        <Heading
          gradient
          level={1}
          className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-center text-transparent dark:from-purple-300 dark:to-blue-400"
        >
          Lupa Password
        </Heading>
        {isSuccess ? (
          <>
            <BsCheckCircle className="mx-auto text-green-500" size={50} />
            <p className="block w-full text-center dark:text-slate-100">
              Link reset password telah dikirim ke email anda, silahkan cek
              bagian spam jika tidak ada di inbox
            </p>
          </>
        ) : (
          <>
            <p className="block w-full text-center dark:text-slate-100">
              Masukan email akun anda untuk mendapatkan link reset password
            </p>
            {errors.root && (
              <p className="text-center font-medium text-red-500">
                {errors.root.message}
              </p>
            )}
            <InputWithLabel
              label="Email"
              placeholder="Masukan Email akun anda"
              type="email"
              id="email"
              required
              {...register("email")}
              error={errors.email as any}
            />
          </>
        )}
        <LoadingButton
          isLoading={isLoading}
          onLoadingText="Sedang mengirim email"
          isSuccess={isSuccess}
          onSuccessText="Email terkirim"
          title="Konfirmasi"
          disabled={isSuccess}
        />
      </FormGroup>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
