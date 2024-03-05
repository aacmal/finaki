import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogleCode } from "@/api/authApi";
import { Routes } from "@/types/Routes";
import { useGoogleLogin } from "@react-oauth/google";
import classNames from "classnames";
import { FcGoogle } from "react-icons/fc";

import Button from "../../components/dls/Button/Button";
import LoadingSpinner from "../../components/dls/Loading/LoadingSpinner";

const LoginWithGoogle = ({
  onError,
}: {
  onError: (message: string) => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onError: (err) => {
      onError(err.error_description!);
    },
    onSuccess: ({ code }) => {
      loginWithGoogleCode(code)
        .then((res) => {
          router.replace(Routes.App);
          localStorage.setItem("access-token", res.data.accessToken);
        })
        .catch((err) => {
          onError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    flow: "auth-code",
  });
  return (
    <Button
      type="button"
      width="full"
      className="!hover:shadow-lg flex items-center justify-center gap-4 border border-slate-200 !bg-slate-50 !shadow-slate-700/20 dark:border-slate-400 dark:!bg-slate-500"
      onClick={() => {
        login();
        setLoading(true);
      }}
    >
      <LoadingSpinner
        className={classNames("stroke-current transition-all duration-500", {
          "max-w-0": !loading,
          "max-w-xs": loading,
        })}
      />
      <span className="text-center font-semibold text-slate-600 dark:text-slate-200">
        {loading ? "Memproses" : "Login dengan Google"}
      </span>
      <FcGoogle size={24} />
    </Button>
  );
};

export default LoginWithGoogle;
