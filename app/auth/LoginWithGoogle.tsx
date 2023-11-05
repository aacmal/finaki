import Button from "@/dls/Button/Button";
import {FcGoogle} from "react-icons/fc";
import {useGoogleLogin} from "@react-oauth/google";
import {loginWithGoogleCode} from "@/api/authApi";
import {Routes} from "@/types/Routes";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import classNames from "classnames";
import {useState} from "react";

const LoginWithGoogle = ({
  onError
} : {
  onError: (message: string) => void
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const login = useGoogleLogin({
    onError: (err) => {
      onError(err.error_description!)
    },
    onSuccess: ({code}) => {
      loginWithGoogleCode(code)
        .then(res => {
          router.replace(Routes.App);
          localStorage.setItem("access-token", res.data.accessToken);
        }).catch(err => {
          onError(err.response.data.message)
        }).finally(() => {
          setLoading(false)
        })
    },
    flow: "auth-code"
  })
  return (
    <Button
      type="button"
      width="full"
      className="!bg-slate-50 dark:!bg-slate-500 flex justify-center items-center gap-4 !hover:shadow-lg dark:border-slate-400 !shadow-slate-700/20 border border-slate-200"
      onClick={() => {
        login();
        setLoading(true);
      }}
    >
      <LoadingSpinner
        className={classNames(
          "transition-all duration-500 stroke-current",
          {
            "max-w-0": !loading,
            "max-w-xs": loading,
          },
        )}
      />
      <span className="text-slate-600 dark:text-slate-200 font-semibold text-center">
        {
          loading ? "Memproses" : "Login dengan Google"
        }
      </span>
      <FcGoogle size={24}/>
    </Button>
  )
}

export default LoginWithGoogle;