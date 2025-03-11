"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie as PieRecharts, PieChart } from "recharts";
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
import { PolicyStatusCountType } from "@/types";
import { chartColor } from "@/lib";

type PieProps = {
  data: PolicyStatusCountType[];
  chartConfig: any;
  chartData: {
    policyStatusCode: string;
    count: number;
    fill: string;
  }[];
  title: string;
  dataKey: string;
  nameKey: string;
  pieLabel: string;
  className?: string;
};

export const Pie = ({
  data,
  chartConfig,
  chartData,
  title,
  dataKey,
  nameKey,
  pieLabel,
  className
}: PieProps) => {
  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card
      className={`${className} flex flex-col m-5 max-w-[412px] min-h-min h-[400px]`}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PieRecharts
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {pieLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PieRecharts>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* {chartColor.map(color => {
          return (
            <div key={color}>
              <div className="flex justify-center items-center">
                <div
                  className="w-2 h-2 bg-[--color] mr-1"
                  style={{ "--color": color }}
                />
                <div>
                  <span>{color}</span>
                </div>
              </div>
            </div>
          );
        })} */}
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total {pieLabel}
        </div>
      </CardFooter>
    </Card>
  );
};
