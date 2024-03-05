import React from "react";
import { TotalTransactionByDay } from "@/types/Transaction";
import { currencyFormat } from "@/utils/currencyFormat";
import classNames from "classnames";

import BarChart from "../Charts/BarChart/BarChart";
import Heading from "../dls/Heading";
import TextWithIcon from "../dls/TextWithIcon";
import TextWithIconPlaceholder from "../dls/TextWithIcon/Placeholder";
import ArrowIcon from "../icons/ArrowIcon";
import Placeholder from "../Placeholder";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";

type Props = {
  data: TotalTransactionByDay[] | undefined;
  loading: boolean;
};

const Ratio = ({ data, loading }: Props) => {
  const COLOR = ["#3b82f6", "#f97316"];
  const totalIncome = data ? data.reduce((acc, curr) => acc + curr.in, 0) : 0;
  const totalOutcome = data ? data.reduce((acc, curr) => acc + curr.out, 0) : 0;
  const total = totalIncome - totalOutcome;

  return (
    <DashboardContentWrapper>
      <DashboardHeader title="Perbandingan">
        <div className="flex items-center gap-4 dark:text-slate-300">
          <div className="flex items-center">
            <div
              style={{ backgroundColor: COLOR[0] }}
              className="mr-2 h-2 w-2 rounded-full"
            ></div>
            <span className="text-sm">Masuk</span>
          </div>
          <div className="flex items-center">
            <div
              style={{ backgroundColor: COLOR[1] }}
              className="mr-2 h-2 w-2 rounded-full"
            ></div>
            <span className="text-sm">Keluar</span>
          </div>
        </div>
      </DashboardHeader>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <BarChart
            color={COLOR}
            data={data!}
            className="h-48 lg:h-72"
            loading={loading}
          />
        </div>
        <div className="flex h-full w-full flex-col gap-5 rounded-xl bg-transparent px-3 py-7 lg:w-[17rem]">
          {!loading ? (
            <>
              <TextWithIcon
                iconPosition="left"
                icon={
                  <ArrowIcon
                    direction="up"
                    strokeWidth={3}
                    stroke="currentColor"
                  />
                }
                className={classNames(
                  "bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-blue-800",
                )}
              >
                {currencyFormat(totalIncome)}
              </TextWithIcon>
              <TextWithIcon
                iconPosition="left"
                icon={
                  <ArrowIcon
                    direction="down"
                    strokeWidth={3}
                    stroke="currentColor"
                  />
                }
                className={classNames(
                  "bg-orange-500 text-white shadow-xl shadow-orange-200 dark:shadow-orange-800",
                )}
              >
                -{currencyFormat(totalOutcome)}
              </TextWithIcon>
              <Heading level={4} fontWeight="medium" className={"mt-6"}>
                Hasil akhir:{" "}
                <span className={classNames({ "text-red-400": total < 0 })}>
                  {currencyFormat(total)}
                </span>
              </Heading>
            </>
          ) : (
            <>
              <TextWithIconPlaceholder />
              <TextWithIconPlaceholder delay={500} />
              <Placeholder className="h-8 w-1/2" animationDelay={1000} />
            </>
          )}
        </div>
      </div>
    </DashboardContentWrapper>
  );
};

export default Ratio;
