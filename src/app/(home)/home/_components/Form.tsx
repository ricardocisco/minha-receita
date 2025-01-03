"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export default function Form({ userId }: { userId: string | undefined }) {
  const {
    createFinanceDb,
    loading,
    finances,
    updateFinance,
    deleteFinance,
    fetchUserFinances,
  } = useFinance(userId ?? "");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [editingUser, setEditingUser] = useState<Finance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
  });
  const handleEdit = (item: Finance) => {
    setEditingUser(item);
    form.reset({
      userId: item.userId,
      type: item.type,
      amount: item.amount,
      modality: item.modality,
      description: item.description,
      date: item.date ? new Date(item.date) : undefined,
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
            <FormCreate userId={userId} createFinanceDb={createFinanceDb} />
          </CardContent>
        </Card>
      </section>
      <section>
        <div>
          <ul>
            {loading ? (
              <p>Carregando...</p>
            ) : finances.length === 0 ? (
              <p>Não há registros</p>
            ) : (
              <div>
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                  <DatePickerWithRange
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range as DateRange)}
                  />
                  <Button>Exportar CSV</Button>
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
          </ul>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <CardData filteredData={filteredData} />
      </section>
    </div>
  );
}
