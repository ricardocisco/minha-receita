import { Finance } from "@/backend/models/FinanceModel";
import { useState } from "react";

export default function useFinance() {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserFinances = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/finance/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setFinances(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createFinanceDb = async (data: Finance) => {
    try {
      const response = await fetch("/api/services/finance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const finance = await response.json();
      setFinances([...finances, finance]);
      return finance;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateFinance = async (id: string, data: Finance) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/finance/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const finance = await response.json();
      setLoading(false);
      return finance;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFinance = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/finance/${id}`, {
        method: "DELETE",
      });
      setFinances((prevFinances) =>
        prevFinances.filter((finance) => finance.id !== id)
      );
      const finance = await response.json();
      setLoading(false);
      return finance;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    finances,
    createFinanceDb,
    updateFinance,
    deleteFinance,
    loading,
    setFinances,
    fetchUserFinances,
  };
}
