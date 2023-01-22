"use client";

import IconButton from "@/dls/IconButton";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import CheckIcon from "@/icons/CheckIcon";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PencilIcon from "@/icons/PencilIcon";
import TrashIcon from "@/icons/TrashIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import classNames from "classnames";
import React, { useState } from "react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isOnEdit?: boolean;
  isLoading?: boolean;
};

const TransactionOption = ({
  onEdit,
  onDelete,
  onCancel,
  isLoading,
  isOnEdit,
}: Props) => {
  const [isHover, setIsHover] = useState(false);

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center">
        <LoadingSpinner className=" stroke-blue-500" />
      </div>
    );
  }

  return (
    <div
      className={classNames("flex-1 text-center lg:static relative", {
        "lg:invisible lg:group-hover:visible": !isOnEdit,
      })}
    >
      {!isOnEdit ? (
        <>
          <div className="hidden lg:flex gap-3 justify-center">
            <IconButton
              type="button"
              onClick={onEdit}
              className="text-blue-500 hover:bg-blue-200"
            >
              <PencilIcon />
            </IconButton>
            <IconButton
              onClick={onDelete}
              className="text-red-500 hover:bg-red-200"
            >
              <TrashIcon />
            </IconButton>
          </div>
          <IconButton
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="lg:hidden"
          >
            <ElipsisVerticalIcon
              className="w-5 h-5 dark:text-slate-200 text-slate-900"
              strokeWidth={2}
              stroke="currentColor"
            />
          </IconButton>
          <div
            className={classNames(
              "lg:hidden absolute p-1 flex gap-3 right-0 rounded top-8 shadow-lg bg-white transform transition-all",
              { "visible opacity-100  translate-y-0": isHover },
              { "invisible opacity-0 -translate-y-4": !isHover }
            )}
          >
            <IconButton
              onClick={onEdit}
              className="text-blue-500 hover:bg-blue-200"
            >
              <PencilIcon />
            </IconButton>
            <IconButton
              onClick={onDelete}
              className="text-red-500 hover:bg-red-200"
            >
              <TrashIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <div className="flex gap-3 justify-center lg:static absolute right-0 lg:bg-transparent bg-white lg:shadow-none shadow-xl rounded-md lg:p-0 p-1 top-6">
          <IconButton
            onClick={onCancel}
            className="text-red-600 hover:bg-red-600/10"
          >
            <XmarkIcon strokeWidth={2} fill="none" stroke="currentColor" />
          </IconButton>
          <IconButton
            type="submit"
            className="text-green-600 hover:bg-green-600/10"
          >
            <CheckIcon strokeWidth={2} fill="none" stroke="currentColor" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TransactionOption;
