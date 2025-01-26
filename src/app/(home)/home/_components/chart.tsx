"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { ChartProps } from "./Form";
import { Component, CreditCard, DollarSign, Receipt } from "lucide-react";

export const description = "An interactive bar chart";

const chartConfig = {
  pix: {
    label: "Pix",
    icon: Component,
    color: "#00bdae"
  },
  dinheiro: {
    label: "Dinheiro",
    icon: DollarSign,
    color: "#16a34a"
  },
  credito: {
    label: "Credito",
    icon: CreditCard,
    color: "#ca8a04"
  },
  debito: {
    label: "Débito",
    icon: CreditCard,
    color: "#ca8a04"
  },
  boleto: {
    label: "Boleto",
    icon: Receipt,
    color: "#4b5563"
  }
} satisfies ChartConfig;

type ChartData = {
  chartData: ChartProps[];
};

export function Chart({ chartData }: ChartData) {
  return (
    <Card>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[290px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="pix" fill="var(--color-pix)" radius={4} />
            <Bar dataKey="dinheiro" fill="var(--color-dinheiro)" radius={4} />
            <Bar dataKey="credito" fill="var(--color-credito)" radius={4} />
            <Bar dataKey="debito" fill="var(--color-debito)" radius={4} />
            <Bar dataKey="boleto" fill="var(--color-boleto)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
