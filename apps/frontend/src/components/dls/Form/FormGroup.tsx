import React from "react";

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

const FormGroup = ({ children, onSubmit, className }: Props) => {
  return (
    <form className={className} onSubmit={onSubmit} action="">
      <div className="space-y-8">{children}</div>
    </form>
  );
};

export default FormGroup;
