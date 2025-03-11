"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { getDateRange } from "@/lib";

const chartConfig = {
  user: {
    label: "User",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export function LineChartLabel() {
  const { dates, year } = getDateRange(4);

  const chartData = [
    { day: dates[3], user: 73 },
    { day: dates[2], user: 209 },
    { day: dates[1], user: 90 },
    { day: "Today", user: 214 }
  ];

  return (
    <>
      <CardHeader className="w-full">
        <CardDescription>
          {dates[3]} - Today {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              fontSize={9}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="user"
              type="natural"
              stroke="var(--color-user)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-user)"
              }}
              activeDot={{
                r: 6
              }}
            >
              <LabelList
                position="insideTop"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm pb-0">
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 days
        </div>
      </CardFooter> */}
    </>
  );
}
