"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../ui/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/Chart"
import SearchMonth from "./searchMonth"

const distanceData = [
  { name: "car", value: 450, fill: "var(--color-car)" },
  { name: "bus", value: 320, fill: "var(--color-bus)" },
  { name: "bike", value: 150, fill: "var(--color-bike)" },
  { name: "train", value: 290, fill: "var(--color-train)" },
  { name: "walk", value: 100, fill: "var(--color-walk)" },
];

const chartConfig = {
  visitors: {
    label: "Users",
  },
  car: {
    label: "Car",
    color: "hsl(var(--chart-1))",
  },
  bus: {
    label: "Bus",
    color: "hsl(var(--chart-2))",
  },
  bike: {
    label: "Bike",
    color: "hsl(var(--chart-3))",
  },
  train: {
    label: "Train",
    color: "hsl(var(--chart-4))",
  },
  walk: {
    label: "Walk",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function TransportDistanceDistribution() {
  const chartData = distanceData

  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <div className="flex flex-row">
  <CardHeader className="flex flex-row items-center justify-between pb-0">
    <div className="w-1/3 p-3">
      <CardTitle>Transport Distribution</CardTitle>
    </div>
    <div className="w-1/3 p-3 z-20">
      <SearchMonth />
    </div>
  </CardHeader>
</div>
      
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
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              paddingAngle={5}
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
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          km
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total distance for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}