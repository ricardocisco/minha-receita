"use client";
import { Finance } from "@/backend/models/FinanceModel";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp, Edit, Trash } from "lucide-react";

export const columns = (
  deleteFinance: (id: string) => void,
  updateFinance: (id: string, data: Finance) => void
): ColumnDef<Finance>[] => [
  {
    accessorKey: "description",
    header: () => <div className="text-left">Descrição</div>,
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
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Tipo</div>,
  },
  {
    accessorKey: "modality",
    header: () => <div className="text-left">Modalidade</div>,
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
