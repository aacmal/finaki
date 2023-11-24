import IconWrapper from "../../dls/IconWrapper";
import ArrowCircleIcon from "../../icons/ArrowCircleIcon";
import { Transaction } from "@/types/Transaction";
import { currencyFormat } from "@/utils/currencyFormat";
import classNames from "classnames";
import transactionStore from "../../../stores/transactionStore";

type Props = {
  isLastItem: boolean;
  transaction: Transaction;
  theme?: "default" | "light";
};

/**
 * This is a simple transaction item component, it will show the simple transaction item and it can't be editable
 * @param props
 * @returns
 * @example
 * <SimpleTransactionItem
 *  isLastItem={false}  // if it's the last item in the list, it will not show the border bottom
 *  type="in"
 *  description="Transfer from BCA"
 *  createdAt="2021-08-01T00:00:00.000Z"
 *  amount={100000}
 * />
 */
const SimpleTransactionItem = ({
  isLastItem,
  transaction,
  theme = "default",
}: Props) => {
  const { setTransactionDetailState } = transactionStore((state) => ({
    setTransactionDetailState: state.setTransactionDetailState,
  }));

  const date = new Date(transaction.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
  const hour = new Date(transaction.createdAt).toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <li
      className={classNames("flex w-full py-3 items-center gap-3", {
        "border-b": !isLastItem,
        "dark:border-slate-500 dark:text-slate-200 text-slate-800":
          theme === "default",
        "border-white/40": theme === "light",
      })}
    >
      <span>
        <IconWrapper className="w-7">
          <ArrowCircleIcon
            direction={transaction.type === "in" ? "up" : "down"}
            className={classNames(
              {
                "text-blue-500":
                  transaction.type === "in" && theme === "default",
              },
              {
                "text-orange-500":
                  transaction.type === "out" && theme === "default",
              },
              { "text-white": theme === "light" }
            )}
          />
        </IconWrapper>
      </span>
      <div className="w-[70%] inline-block">
        <div
          onClick={() =>
            setTransactionDetailState({
              transaction: transaction,
              isOpen: true,
            })
          }
          className={classNames(
            "font-medium cursor-pointer w-44 md:w-60 lg:w-72 truncate"
          )}
        >
          {transaction.description}
        </div>
        <span className="flex items-center text-sm">
          <span className="font-medium mr-1">{date}</span>
          <span
            className={classNames(
              {
                "dark:text-slate-400 text-slate-500": theme === "default",
              },
              {
                "text-white/80": theme === "light",
              }
            )}
          >
            {hour}
          </span>
        </span>
      </div>
      <span
        className={classNames(
          "font-medium  ml-auto whitespace-nowrap",
          { "text-blue-500": transaction.type === "in" && theme === "default" },
          {
            "text-orange-500":
              transaction.type === "out" && theme === "default",
          },
          { "text-white": theme === "light" }
        )}
      >
        {transaction.type === "in" ? "+" : "-"}
        {currencyFormat(transaction.amount)}
      </span>
    </li>
  );
};

export default SimpleTransactionItem;
