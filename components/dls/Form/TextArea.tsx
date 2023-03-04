import classNames from "classnames";
import React, { forwardRef, LegacyRef, Ref } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  transparent?: boolean;
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  padding?: string;
  error?: {
    message: string;
  };
}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef(
  (
    {
      transparent,
      className,
      id,
      error,
      label,
      placeholder,
      padding = "px-4 py-4",
      ...props
    }: Props,
    ref: LegacyRef<HTMLTextAreaElement>
  ) => {
    return (
      <div
        className={classNames(
          "flex flex-col input-with-label-wrapper",
          className
        )}
      >
        <textarea
          {...props}
          className={classNames("w-full rounded-xl", padding)}
          id={id}
          ref={ref}
          placeholder={placeholder}
          defaultValue={props.defaultValue}
        ></textarea>
        <label htmlFor={id}>{label}</label>
        {error && (
          <small
            role="alert"
            className="text-red-400 absolute -bottom-5 font-semibold left-3"
          >
            {error.message}
          </small>
        )}
      </div>
    );
  }
);

export default TextArea;
