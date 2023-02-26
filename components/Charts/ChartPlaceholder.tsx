import React from "react";

type Props = {
  message: string;
};

const ChartPlaceholder = ({ message }: Props) => {
  return (
    <div className="grid place-items-center w-full h-full text-xs md:text-sm dark:text-slate-200">
      {message}
    </div>
  );
};

export const ChartLoading = () => (
  <ChartPlaceholder message="Mengambil data..." />
);

export const ChartError = () => <ChartPlaceholder message="Ada yang salah" />;

export default ChartPlaceholder;
