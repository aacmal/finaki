import React from "react";

type Props = {
  children: React.ReactNode;
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
