import React from "react";

type Props = {
  className?: string;
  message?: string;
};

const NoData = (props: Props) => {
  return (
    <div className="w-full h-full grid place-items-center">
      <span className=" font-medium dark:text-slate-200">
        {props.message ?? "Belum ada data yang ditampilkan."}
      </span>
    </div>
  );
};

export default NoData;
