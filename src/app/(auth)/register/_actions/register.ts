"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function Register(FormData: FormData) {
  const entries = Array.from(FormData.entries());
  const { name, email, password } = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password) {
    throw new Error("Preencha todos os campos");
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("Usuário já existe");
  }

  await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password),
    },
  });

  redirect("/login");
}
