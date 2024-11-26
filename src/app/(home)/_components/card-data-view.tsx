import { Finance } from "@/backend/models/FinanceModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Type } from "@prisma/client";
import { MoveDown, MoveUp } from "lucide-react";
import React from "react";

interface CardDataProps {
  filteredData: Finance[];
}

const Icons = {
  Entrada: <MoveUp className="h-4 w-4 text-green-600" />,
  Saida: <MoveDown className="h-4 w-4 text-red-600" />,
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

  const types = Array.from(new Set(filteredData.map((item) => item.type)));

  return (
    <>
      {types.map((type) => (
        <Card className="flex flex-col gap-1" key={type}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                {getIcons(type)} {type}
              </div>
            </CardTitle>
            <CardDescription>Acompanhar as finanças de {type}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>{type}:</p>
              <p>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(calculateTotalByType(type))}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
