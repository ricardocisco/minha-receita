import { Finance } from "@/backend/models/FinanceModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Type } from "@prisma/client";
import { MoveDown, MoveUp } from "lucide-react";
import React from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts";

interface CardDataProps {
  filteredData: Finance[];
}

const Icons = {
  Entrada: <MoveUp className="h-4 w-4 text-green-600" />,
  Saida: <MoveDown className="h-4 w-4 text-red-600" />
};

function getIcons(type: Type) {
  return Icons[type] || null;
}

export default function CardData({ filteredData }: CardDataProps) {
  const calculateTotalByType = (type: string) => {
    return filteredData
      .filter((item) => item.type === type)
      .reduce((acc, item) => acc + item.amount, 0);
  };

  const entradaTotal = calculateTotalByType("Entrada");
  const saidaTotal = calculateTotalByType("Saida");

  const valor_maximo = 3000;

  const calculateAngle = (value: number) => {
    return Math.min((value / valor_maximo) * 360, 360);
  };

  const data = [
    { type: "Entrada", value: entradaTotal, fill: "hsl(var(--chart-1))" },
    { type: "Saida", value: saidaTotal, fill: "hsl(var(--chart-5))" }
  ];

  return (
    <div className="flex flex-col sm:flex-col md:flex-row rounded-xl border bg-card text-card-foreground shadow justify-around">
      <Card className="flex flex-col border-none items-center">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex items-center gap-2">
              {getIcons("Entrada")} Entrada
            </div>
          </CardTitle>
          <CardDescription>Finanças de Entrada</CardDescription>
        </CardHeader>
        <CardContent>
          <RadialBarChart
            width={200}
            height={200}
            data={[data[0]]}
            startAngle={90}
            endAngle={90 + calculateAngle(entradaTotal)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="value"
              cornerRadius={10}
              background
              fill={data[0].fill}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {entradaTotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          })}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </CardContent>
      </Card>
      <Card className="flex flex-col border-none items-center">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex items-center gap-2">
              {getIcons("Saida")} Saída
            </div>
          </CardTitle>
          <CardDescription>Finanças de Saída</CardDescription>
        </CardHeader>
        <CardContent>
          <RadialBarChart
            width={200}
            height={200}
            data={[data[1]]}
            startAngle={90}
            endAngle={90 + calculateAngle(saidaTotal)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="value"
              cornerRadius={10}
              background
              fill={data[1].fill}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {saidaTotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          })}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </CardContent>
      </Card>
    </div>
  );
}
