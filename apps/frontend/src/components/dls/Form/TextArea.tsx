import React, { forwardRef, LegacyRef } from "react";
import classNames from "classnames";

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
      className,
      id,
      error,
      label,
      placeholder,
      padding = "px-4 py-4",
      ...props
    }: Props,
    ref: LegacyRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div
        className={classNames(
          "input-with-label-wrapper flex flex-col",
          className,
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
            className="absolute -bottom-5 left-3 font-semibold text-red-400"
          >
            {error.message}
          </small>
        )}
      </div>
    );
  },
);

export default TextArea;
