import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormGroup = ({ children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} action="">
      <div className="space-y-8">{children}</div>
    </form>
  );
};

export default FormGroup;
