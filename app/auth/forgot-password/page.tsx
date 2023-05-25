"use client";

import { forgotPassword } from "@/api/authApi";
import AuthCard from "@/components/AuthCard/AuthCard";
import LoadingButton from "@/dls/Button/LoadingButton";
import FormGroup from "@/dls/Form/FormGroup";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
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
      console.log(errors)
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
    <AuthCard className="!max-w-lg lg:!h-fit lg:!flex-col !p-5 !py-8">
      <FormGroup
        onSubmit={handleSubmit(onSubmitHandler)}
        className="space-y-5 w-full "
      >
        <Heading level={1} className="text-center block w-full">
          Lupa Password
        </Heading>
        {isSuccess ? (
          <>
            <BsCheckCircle className="mx-auto text-green-500" size={50} />
            <p className="text-center block w-full">
              Link reset password telah dikirim ke email anda, silahkan cek
              bagian spam jika tidak ada di inbox
            </p>
          </>
        ) : (
          <>
            <p className="text-center block w-full">
              Masukan email akun anda untuk mendapatkan link reset password
            </p>
            {errors.root && <p className="text-center text-red-500 font-medium">{errors.root.message}</p>}
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
