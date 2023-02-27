import { currencyFormat } from "@/utils/currencyFormat";
import { forwardRef, useState } from "react";
import InputWithLabel from "./InputWithLabel";

type Props = {
  placeholder: string;
  label: string;
  id?: string;
  prefixSymbol?: string;
  error?: any;
  className?: string;
  required?: boolean;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  onReset?: () => void;
  min?: number;
};

const CurrencyInput = forwardRef(function CurrencyInput(
  { prefixSymbol = "Rp", ...props }: Props,
  ref: React.Ref<HTMLInputElement>
) {
  const [value, setValue] = useState<number>();
  return (
    <InputWithLabel
      min={props.min}
      {...props}
      type="text"
      ref={ref}
      onChange={(e) => {
        setValue(() => {
          const newValue = parseInt(e.target.value.replace(/[^0-9]/g, ""));
          if (isNaN(newValue)) return 0;
          return newValue;
        });
        props.onChange && props.onChange(e);
      }}
      value={
        props.value
          ? value
            ? `${prefixSymbol} ${currencyFormat(value, {})}`
            : ""
          : ""
      }
      id={props.label}
    />
  );
});

export default CurrencyInput;
