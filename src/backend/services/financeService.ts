import db from "@/lib/db";
import { Finance } from "../models/FinanceModel";

export async function getUserFinances(id: string) {
  return await db.finance.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      date: "asc",
    },
    include: {
      user: true,
    },
  });
}

export async function createFinance(data: Finance) {
  return await db.finance.create({
    data: {
      type: data.type,
      amount: data.amount,
      description: data.description,
      modality: data.modality,
      userId: data.userId,
      date: new Date(data.date ?? new Date()),
      createdAt: new Date(),
    },
  });
}

export async function deleteFinance(id: string) {
  return await db.finance.delete({
    where: {
      id,
    },
  });
}

export async function updateFinance(id: string, data: Finance) {
  return await db.finance.update({
    where: {
      id,
    },
    data,
  });
}
