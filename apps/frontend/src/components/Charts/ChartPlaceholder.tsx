import React from "react";

type Props = {
  message: string;
};

const ChartPlaceholder = ({ message }: Props) => {
  return (
    <div className="grid h-full w-full place-items-center text-xs dark:text-slate-200 md:text-sm">
      {message}
    </div>
  );
};

export const ChartLoading = () => (
  <ChartPlaceholder message="Mengambil data..." />
);

export const ChartError = () => <ChartPlaceholder message="Ada yang salah" />;

export default ChartPlaceholder;
