import React from "react";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import TextWithIcon from "@/dls/TextWithIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import classNames from "classnames";
import { TotalTransactionByDay } from "@/types/Transaction";
import Heading from "@/dls/Heading";
import BarChart from "../Charts/BarChart/BarChart";
import { currencyFormat } from "@/utils/currencyFormat";
import TextWithIconPlaceholder from "@/dls/TextWithIcon/Placeholder";
import Placeholder from "../Placeholder";

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
              className="h-2 w-2 rounded-full mr-2"
            ></div>
            <span className="text-sm">Masuk</span>
          </div>
          <div className="flex items-center">
            <div
              style={{ backgroundColor: COLOR[1] }}
              className="h-2 w-2 rounded-full mr-2"
            ></div>
            <span className="text-sm">Keluar</span>
          </div>
        </div>
      </DashboardHeader>
      <div className="flex gap-4 lg:flex-row flex-col">
        <div className="flex-1">
          <BarChart
            color={COLOR}
            data={data!}
            className="h-48 lg:h-72"
            loading={loading}
          />
        </div>
        <div className="lg:w-[17rem] w-full h-full bg-transparent py-7 px-3 rounded-xl flex flex-col gap-5">
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
                  "bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-blue-800"
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
                  "bg-orange-500 text-white shadow-xl shadow-orange-200 dark:shadow-orange-800"
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
              <Placeholder className="w-1/2 h-8" animationDelay={1000} />
            </>
          )}
        </div>
      </div>
    </DashboardContentWrapper>
  );
};

export default Ratio;
