"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { name: "Safari", visitors: 200, fill: "hsl(var(--chart-1))" },
  { name: "Chrome", visitors: 300, fill: "hsl(var(--chart-2))" }
];

const chartConfig = {
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))"
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export function RadialChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={450}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="none" />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax"]}
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData
                            .reduce((total, item) => total + item.visitors, 0)
                            .toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
