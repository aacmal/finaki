/* eslint-disable no-unused-vars */
import { forwardRef, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";

import InputWithLabel from "./InputWithLabel";

type Props = {
  placeholder: string;
  label?: string;
  id: string;
  prefixSymbol?: string;
  error?: any;
  className?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  onReset?: () => void;
  min?: number;
  inputStyle?: string;
};

const CurrencyInput = forwardRef(function CurrencyInput(
  { prefixSymbol = "Rp", className, inputStyle, ...props }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  const [value, setValue] = useState<number>(
    props.value ? parseInt(props.value) : 0,
  );

  return (
    <InputWithLabel
      inputStyle={inputStyle}
      className={className}
      min={props.min}
      {...props}
      defaultValue={undefined}
      type="text"
      inputMode="numeric"
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
      id={props.id}
    />
  );
});

export default CurrencyInput;
