"use client";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFinance from "@/app/hooks/useFinance";
import { FormProvider, useForm } from "react-hook-form";
import { formData, formSchema } from "@/backend/models/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DataTable } from "./data-table";
import { columns as generateColumns } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";

export default function Form({ userId }: { userId: string | undefined }) {
  const { createFinanceDb, loading, finances, updateFinance, deleteFinance } =
    useFinance();
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId,
      type: "Entrada",
      amount: 0,
      description: "",
      modality: "Pix",
      date: undefined,
    },
  });

  const onSubmit = async (data: formData) => {
    try {
      const formatedDate = {
        ...data,
        date: data.date?.toISOString(),
      };
      await createFinanceDb(formatedDate);
      setError(null);
      form.reset();
    } catch (error) {
      console.log(error);
      setError("Erro ao criar anuncio");
    }
  };

  const columns = generateColumns(deleteFinance, updateFinance);

  const filteredData = finances.filter((item) => {
    const itemDate = item.date ? new Date(item.date) : undefined;
    const { from, to } = dateRange;

    return itemDate && (!from || itemDate >= from) && (!to || itemDate <= to);
  });

  return (
    <>
      <section className="p-4">
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
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col lg:flex-row w-full items-center gap-2 justify-around">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex: Pagamento Fatura"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Data</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            placeholder="Ex: Digite o valor Ex: 159,90"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Entrada">Entrada</SelectItem>
                              <SelectItem value="Saida">Saida</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modality"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Modalidade</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar Modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pix">Pix</SelectItem>
                              <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                              <SelectItem value="Credito">Credito</SelectItem>
                              <SelectItem value="Debito">Debito</SelectItem>
                              <SelectItem value="Boleto">Boleto</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button className="w-full" variant={"outline"} type="submit">
                    Salvar
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </section>
      <section className="p-4">
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
    </>
  );
}
