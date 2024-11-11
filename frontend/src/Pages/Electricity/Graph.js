"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/Chart";
const chartData = [
  { month: "Nov", desktop: 320 },
  { month: "Dec", desktop: 290 },
  { month: "Jan", desktop: 310 },
  { month: "Feb", desktop: 400 },
  { month: "Mar", desktop: 420 },
  { month: "Apr", desktop: 390 },
  { month: "May", desktop: 450 },
  { month: "June", desktop: 430 },
  { month: "July", desktop: 410 },
  { month: "Aug", desktop: 380 },
  { month: "Sep", desktop: 370 },
  { month: "Oct", desktop: 400 },
];

const chartConfig = {
  desktop: {
    label: "Consumption: ",
    color: "#059669",
  },
};

export function Graph() {
  return (
    <div className="h-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Label</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
