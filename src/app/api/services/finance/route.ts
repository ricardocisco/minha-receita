"use server";
import { createFinance } from "@/backend/services/financeService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const finance = await createFinance(data);
    return NextResponse.json(finance);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error, message: "Erro ao criar finança" },
      { status: 500 }
    );
  }
}
