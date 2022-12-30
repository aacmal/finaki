import classNames from "classnames";

import styles from "./InputWithLabel.module.scss";

type Props = {
  type: "text" | "number" | "password" | "email";
  placeholder: string;
  value?: string | number;
  ref?: React.RefObject<HTMLInputElement>;
  label: string;
  id: string;
  defaultValue?: string;
  className?: string;
};

const InputWithLabel = ({
  id,
  type,
  placeholder,
  value,
  ref,
  label,
  className,
  defaultValue,
}: Props) => {
  return (
    <div
      className={classNames("flex flex-col", styles.inputWrapper, className)}
    >
      <input
        className={classNames("w-full px-4 py-4 rounded-xl")}
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputWithLabel;
