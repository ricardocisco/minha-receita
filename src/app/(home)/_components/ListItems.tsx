"use client";

import useFinance from "@/app/hooks/useFinance";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useEffect } from "react";

export default function ListItems() {
  const { finances, loading, deleteFinance } = useFinance();

  useEffect(() => {}, [finances]);

  return (
    <section className="p-4">
      <h1>Lista de Gastos/Receitas</h1>
      <div>
        <ul>
          {loading ? (
            <p>Carregando...</p>
          ) : finances.length === 0 ? (
            <p>Não há registros</p>
          ) : (
            finances.map((finance) => (
              <div
                key={finance.id}
                className="flex items-center justify-between"
              >
                <li>
                  {finance.description} - {finance.amount} - {finance.modality}{" "}
                  - {finance.type} - {finance.date}
                </li>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-red-600"
                  onClick={() => deleteFinance(finance.id)}
                >
                  <Trash />
                </Button>
              </div>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
