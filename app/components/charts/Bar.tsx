"use client";

import { useMemo } from "react";
import {
  BarChart as BChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui";
import {CustomerType } from "@/types";

type ChartDataItem = {
  [key: string]: string | number;
  count: number;
  fill: string;
};

type CustomerBarProps = {
  dataKey: string;
  name: string;
  data:CustomerType[];
  chartConfig: any;
  chartData: ChartDataItem[];
  className?: string;
};

export const Bar = ({
  dataKey,
  name,
  data,
  chartConfig,
  chartData,
  className
}: CustomerBarProps) => {
  const totalCount = useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <Card className={`${className} shadow p-1 m-5`}>
      <CardContent className="flex-1 pb-0 mt-5">
        <ChartContainer config={chartConfig} className="h-28 w-full">
          <BChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <RechartsBar dataKey="count" name={name} />
            <ReferenceLine
              y={totalCount}
              label={{ value: `Total ${name}`, position: "insideTopLeft" }}
              stroke="red"
              strokeDasharray="3 3"
            />
          </BChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
