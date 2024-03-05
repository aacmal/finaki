"use client";

import React, { useState } from "react";
import classNames from "classnames";

import IconButton from "../../dls/IconButton";
import LoadingSpinner from "../../dls/Loading/LoadingSpinner";
import CheckIcon from "../../icons/CheckIcon";
import ElipsisVerticalIcon from "../../icons/ElipsisVerticalIcon";
import PencilIcon from "../../icons/PencilIcon";
import TrashIcon from "../../icons/TrashIcon";
import XmarkIcon from "../../icons/XmarkIcon";

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
      <div className="flex flex-1 justify-center">
        <LoadingSpinner className=" stroke-blue-500" />
      </div>
    );
  }

  return (
    <div
      className={classNames("relative flex-1 text-center lg:static", {
        "lg:invisible lg:group-hover:visible": !isOnEdit,
      })}
    >
      {!isOnEdit ? (
        <>
          <div className="hidden justify-center gap-3 lg:flex">
            <IconButton
              type="button"
              onClick={onEdit}
              className="text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-600/30"
            >
              <PencilIcon />
            </IconButton>
            <IconButton
              onClick={onDelete}
              className="text-red-500 hover:bg-red-200 dark:hover:bg-red-600/30"
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
              className="h-5 w-5 text-slate-900 dark:text-slate-200"
              strokeWidth={2}
              stroke="currentColor"
            />
          </IconButton>
          <div
            className={classNames(
              "absolute right-0 top-8 flex transform gap-3 rounded bg-white p-1 shadow-lg transition-all lg:hidden",
              { "visible translate-y-0  opacity-100": isHover },
              { "invisible -translate-y-4 opacity-0": !isHover },
            )}
          >
            <IconButton
              onClick={onEdit}
              className="text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-600/30"
            >
              <PencilIcon />
            </IconButton>
            <IconButton
              onClick={onDelete}
              className="text-red-500 hover:bg-red-200 dark:hover:bg-red-600/30"
            >
              <TrashIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <div className="absolute right-0 top-6 flex justify-center gap-3 rounded-md bg-white p-1 shadow-xl lg:static lg:bg-transparent lg:p-0 lg:shadow-none">
          <IconButton
            onClick={onCancel}
            className="text-red-600 hover:bg-red-600/10"
          >
            <XmarkIcon strokeWidth={2} fill="none" stroke="currentColor" />
          </IconButton>
          <IconButton
            type="submit"
            className="text-green-600 hover:bg-green-600/10"
            form="edit-transaction-form"
          >
            <CheckIcon strokeWidth={2} fill="none" stroke="currentColor" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TransactionOption;
