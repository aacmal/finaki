import IconWrapper from "@/dls/IconWrapper";
import classNames from "classnames";
import style from "./RadioButton.module.scss";

type Props = {
  id: string;
  name: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
  checked?: boolean;
};

const RadioButton = ({ id, name, label, className, icon, checked }: Props) => {
  return (
    <li className={classNames(style.radioButton)}>
      <input
        checked={checked}
        className="sr-only"
        type="radio"
        id={id}
        name={name}
      />
      <label className="flex items-center gap-1" htmlFor={id}>
        {icon && <IconWrapper className="!w-4">{icon}</IconWrapper>}
        {label}
      </label>
    </li>
  );
};

export default RadioButton;
