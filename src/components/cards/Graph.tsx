"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PingLog } from "@/types";
import { useEffect, useState } from "react";
import { convertTo24HourFormat } from "@/lib/utils";
const chartData2 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Graph({ Logs }: { Logs: PingLog[] }) {
  const [chartData, setChartData] = useState<
    { time: string; response_time: string }[]
  >([]);

  useEffect(() => {
    const data = Logs.map((Log) => {
      let time = convertTo24HourFormat(Log.time);
      let response_time = Log.timeTake.toString();
      return { time, response_time };
    });
    setChartData(data);
  }, [Logs]);
  return (
    <Card className="mt-2 md:mt-6">
      <CardHeader>
        <CardTitle>Response Time Chart</CardTitle>
        <CardDescription>Response time over the time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
