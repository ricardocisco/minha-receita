"use client";
import { Finance } from "@/backend/models/FinanceModel";
import { Button } from "@/components/ui/button";
import { Modality, Type } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownUp,
  Component,
  CreditCard,
  DollarSign,
  Edit,
  MoveDown,
  MoveUp,
  Receipt,
  Trash,
} from "lucide-react";

const Modalitys = {
  Pix: <Component className="h-4 w-4 text-green-600" />,
  Dinheiro: <DollarSign className="h-4 w-4 text-yellow-600" />,
  Credito: <CreditCard className="h-4 w-4 text-green-600" />,
  Debito: <CreditCard className="h-4 w-4 text-green-600" />,
  Boleto: <Receipt className="h-4 w-4 text-gray-600" />,
};

const Icons = {
  Entrada: <MoveUp className="h-4 w-4 text-green-600" />,
  Saida: <MoveDown className="h-4 w-4 text-red-600" />,
};

function getIcons(type: Type) {
  return Icons[type] || null;
}

function getModalitys(modality: Modality) {
  return Modalitys[modality] || null;
}

export const columns = (
  deleteFinance: (id: string) => void,
  updateFinance: (id: string, data: Finance) => void
): ColumnDef<Finance>[] => [
  {
    accessorKey: "description",
    header: () => <div className="text-left">Descrição</div>,
    footer: () => <div className="text-left">Total:</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valor <ArrowDownUp className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((acc, row) => {
        const amount = parseFloat(row.getValue("amount"));
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(total);

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipo <ArrowDownUp className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as Type;
      return (
        <div className="flex items-center">
          {getIcons(type)}
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "modality",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modalidade <ArrowDownUp className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const modality = row.getValue("modality") as Modality;
      return (
        <div className="flex gap-2 items-center">
          {getModalitys(modality)}
          {modality}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data <ArrowDownUp className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formated = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <div className="text-left">{formated.format(date)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id as string;
      return (
        <>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-red-600"
            onClick={() => deleteFinance(id)}
          >
            <Trash />
          </Button>
          <Button variant={"ghost"} size={"icon"} className="text-blue-600">
            <Edit onClick={() => updateFinance(id, row.original)} />
          </Button>
        </>
      );
    },
  },
];
