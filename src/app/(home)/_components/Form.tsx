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

  const columns = generateColumns(deleteFinance, updateFinance);

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
                <DatePickerWithRange
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range as DateRange)}
                />
                <DataTable columns={columns} data={filteredData} />
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
