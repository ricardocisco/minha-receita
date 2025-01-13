/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { Session } from "next-auth";
import { Label } from "@/components/ui/label";

type PropsForm = {
  userId: string | undefined;
  session: Session | null;
};

export default function Form({ userId, session }: PropsForm) {
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
    <div className="flex flex-col gap-8 p-4">
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-center lg:text-2xl">
              Meu Controle Financeiro
            </CardTitle>
            <CardDescription className="text-center">
              Preencha o formulário abaixo para adicionar um novo gasto/receita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormCreate
              userId={userId}
              createFinanceDb={createFinanceDb}
              session={session}
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="flex flex-col justify-center">
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
      <section className="grid grid-cols-2 gap-4">
        <CardData filteredData={filteredData} />
      </section>
    </div>
  );
}
