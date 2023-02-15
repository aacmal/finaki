import classNames from "classnames";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Button from "./Button";

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
  onSuccessText: string;
  isError?: boolean;
  onErrorText?: string;
  onLoadingText: string;
  width?: "full" | "auto" | "fit";
  title: string;
  loadingOnSuccess?: boolean;
  styleButton?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

const LoadingButton = ({
  isLoading,
  isSuccess,
  width = "full",
  onSuccessText,
  onLoadingText,
  isError,
  onErrorText,
  title,
  loadingOnSuccess,
  styleButton,
  onClick,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      buttonStyle={styleButton}
      disabled={isLoading}
      width={width}
      type="submit"
    >
      <div className="flex items-center justify-center">
        <LoadingSpinner
          className={classNames(
            "transition-all duration-500 stroke-white",
            {
              "max-w-0 mr-0": !isLoading,
              "max-w-xs mr-3": isLoading,
            },
            { "max-w-xs mr-3": isSuccess && loadingOnSuccess }
          )}
        />
        <span>
          {isSuccess && onSuccessText}
          {isLoading && onLoadingText}
          {isError && onErrorText}
          {!isLoading && !isSuccess && !isError && title}
        </span>
      </div>
    </Button>
  );
};

export default LoadingButton;
