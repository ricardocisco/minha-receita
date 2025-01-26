/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import useFinance from "@/app/hooks/useFinance";
import { DataTable } from "./data-table";
import { columns as generateColumns } from "./columns";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import CardData from "./card-data-view";
import FormCreate from "./form-create";
import { Finance } from "@/backend/models/FinanceModel";
import { formData, formSchema } from "@/backend/models/formSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormUpdate from "./form-update";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { Label } from "@/components/ui/label";
import { Chart } from "./chart";
import { CirclePlus } from "lucide-react";

type PropsForm = {
  userId: string | undefined;
};

export type ChartProps = {
  month: string;
  pix: string | number;
  dinheiro: string | number;
  credito: string | number;
  debito: string | number;
  boleto: string | number;
};

export default function Form({ userId }: PropsForm) {
  const {
    createFinanceDb,
    loading,
    finances,
    updateFinance,
    deleteFinance,
    fetchUserFinances
  } = useFinance(userId ?? "");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });
  const [editingUser, setEditingUser] = useState<Finance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenCreate, setIsDialogOpenCreate] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema)
  });
  const handleEdit = (item: Finance) => {
    setEditingUser(item);
    form.reset({
      userId: item.userId,
      type: item.type,
      amount: item.amount,
      modality: item.modality,
      description: item.description,
      date: item.date ? new Date(item.date) : undefined
    });
    setIsDialogOpen(true);
  };

  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    if (!editingUser) return;
    try {
      await updateFinance(editingUser.id as string, data);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = generateColumns(deleteFinance, handleEdit);

  const filteredData = finances.filter((item) => {
    const itemDate = item.date ? new Date(item.date) : undefined;
    const { from, to } = dateRange;

    return itemDate && (!from || itemDate >= from) && (!to || itemDate <= to);
  });

  const chartData: ChartProps[] = filteredData.map((item) => ({
    month: item.date
      ? new Date(item.date).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "numeric",
          year: "numeric"
        })
      : "",
    pix: item.modality === "Pix" ? item.amount.toFixed(2) : 0,
    dinheiro: item.modality === "Dinheiro" ? item.amount.toFixed(2) : 0,
    credito: item.modality === "Credito" ? item.amount.toFixed(2) : 0,
    debito: item.modality === "Debito" ? item.amount.toFixed(2) : 0,
    boleto: item.modality === "Boleto" ? item.amount.toFixed(2) : 0
  }));

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchFinances = async () => {
      await fetchUserFinances(userId);
    };
    fetchFinances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExportToExcel = () => {
    if (filteredData.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const formattedData = filteredData.map((item) => ({
      Tipo: item.type,
      Valor: item.amount,
      Descrição: item.description,
      Modalidade: item.modality,
      Data: item.date ? new Date(item.date).toLocaleDateString() : "N/A"
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Finanças");

    XLSX.writeFile(workbook, "gastos.xlsx");
  };

  return (
    <div className="flex flex-col gap-8 p-4 ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Visão Geral</Label>
        <Button variant={"outline"} onClick={() => setIsDialogOpenCreate(true)}>
          Registrar <CirclePlus />
        </Button>
        <FormCreate
          isOpen={isDialogOpenCreate}
          onClose={() => setIsDialogOpenCreate(false)}
          userId={userId}
          createFinanceDb={createFinanceDb}
        />
      </section>
      <section className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <Chart chartData={chartData} />
        <CardData filteredData={filteredData} />
      </section>
      <section>
        <div className="flex flex-col justify-center mx-auto">
          {loading ? (
            <Label className="text-center text-lg">Carregando...</Label>
          ) : finances.length === 0 ? (
            <Label className="text-center text-lg">
              Parece que ainda nenhuma finança foi cadastrada, para criar uma
              basta criar sua conta!
            </Label>
          ) : (
            <div>
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                <DatePickerWithRange
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range as DateRange)}
                />
                <Button onClick={handleExportToExcel}>Exportar XLSX</Button>
              </div>
              <DataTable columns={columns} data={filteredData} />
              <FormUpdate
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                form={form}
                onSubmit={onSubmit}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
