import {
  deleteFinance,
  updateFinance,
} from "@/backend/services/financeService";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const data = await req.json();
    const finance = await updateFinance(id, data);
    return NextResponse.json(finance);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const finance = await deleteFinance(id);
    return NextResponse.json(finance);
  } catch (error) {
    return NextResponse.json(error);
  }
}
