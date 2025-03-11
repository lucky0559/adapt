"use client";

import { Area, AreaChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Separator } from "@/components/ui";
import TransactionDetails from "@/components/dashboard/TransactionDetails";
import AreaCheckboxLists from "@/components/dashboard/AreaCheckboxLists";
import { useMemo } from "react";
import { useTransactionStore } from "@/store/transaction";

type AreaTrendProps = {
  areaTrendProps: {
    title: string;
    description?: string;
    chartConfig: any;
    axisDataKey: string;
  };
};

export function AreaTrend({ areaTrendProps }: AreaTrendProps) {
  const { title, description, chartConfig, axisDataKey } = areaTrendProps;

  const { transactions, areaDataKey, isLoading } = useTransactionStore(
    state => state
  );

  const chartData = useMemo(() => {
    return transactions;
  }, [transactions]);

  return (
    <Card className="m-5 pb-5">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div>
          <AreaCheckboxLists />
        </div>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-3">
        {isLoading ? (
          <div className="flex items-center justify-center">
            {/* <Skeleton className="h-40 w-full mb-4 rounded-lg" /> */}
            <span>No Data Selected</span>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-56 w-full px-3 col-span-2"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 15,
                right: 15
              }}
            >
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey={axisDataKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              {areaDataKey?.map(key => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={`var(--color-${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId="a"
                />
              ))}

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
        <div className="p-2 pb-5 flex items-center justify-center">
          <Separator orientation="vertical" className="my-4 mr-3" />
          <div className="px-2 pt-5">
            <div className="mb-4">
              <span className="font-bold text-lg">Action Details</span>
            </div>
            {!!areaDataKey?.length ? (
              // TODO: TRANSACTION DETAILS INTEGRATION
              areaDataKey?.map(data => {
                let transaction;
                // let count;
                switch (data) {
                  case "updateProfile":
                    transaction = "Update Profile";
                    break;
                  case "changeDispatchAddress":
                    transaction = "Change Dispatch Address";
                    break;
                  case "updateBeneficiary":
                    transaction = "Update Beneficiary";
                    break;
                  default:
                    break;
                }

                return (
                  <div className="mb-2" key={transaction}>
                    <TransactionDetails transaction={transaction} count={55} />
                  </div>
                );
              })
            ) : (
              <span>No selected action</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
