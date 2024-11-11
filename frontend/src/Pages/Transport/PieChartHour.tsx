import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import SearchMonth from "./searchMonth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/Chart";
import { useLocation } from "react-router-dom"; // Import useLocation for query params

// Define the data structure for chart data
interface ChartData {
  name: string;
  value: number;
  fill: string;
}

const chartConfig = {
  motorcycling: {
    label: "Motorcycling",
    color: "hsl(var(--chart-1))",
  },
  passenger_vehicle: {
    label: "Passenger Vehicle",
    color: "hsl(var(--chart-2))",
  },
  train: {
    label: "Train",
    color: "hsl(var(--chart-3))",
  },
  walking: {
    label: "Walking",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function TransportHourDistribution() {
  const location = useLocation(); // Get access to the current location (URL)
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [month, setMonth] = useState<string>("JULY");  // Default month

  useEffect(() => {
    // Extract the month from the query parameter
    const params = new URLSearchParams(location.search); // Parse the query string
    const monthFromUrl = params.get("month");
    if (monthFromUrl) {
      setMonth(monthFromUrl.toUpperCase());  // Set the month in uppercase for consistency
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/analyze/?month=${month}`);
        const data = response.data;

        // Check if the required data structure exists
        if (data && data.travel_summary_kms) {
          const formattedData: ChartData[] = [
            { name: "MOTORCYCLING", value: data.travel_summary_kms.MOTORCYCLING || 0, fill: "var(--color-motorcycling)" },
            { name: "IN_PASSENGER_VEHICLE", value: data.travel_summary_kms.IN_PASSENGER_VEHICLE || 0, fill: "var(--color-passenger_vehicle)" },
            { name: "IN_TRAIN", value: data.travel_summary_kms.IN_TRAIN || 0, fill: "var(--color-train)" },
            { name: "WALKING", value: data.travel_summary_kms.WALKING || 0, fill: "var(--color-walking)" },
          ];

          setChartData(formattedData);

          // Calculate total distance
          const totalKms = formattedData.reduce((acc, curr) => acc + curr.value, 0);
          setTotalValue(totalKms);
        } else {
          console.error("Error: Data structure is missing travel_summary_kms.");
        }
      } catch (error) {
        console.error("Error fetching transport data:", error);
      }
    };

    fetchData();
  }, [month]); // Re-fetch data whenever the month changes

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
                    );
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
          Showing total distance for {month}
        </div>
      </CardFooter>
    </Card>
  );
}
