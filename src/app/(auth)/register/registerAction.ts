/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function RegisterAction(
  _prevState: any,
  FormData: FormData
) {
  const entries = Array.from(FormData.entries());
  const { name, email, password } = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  //Verificar se todos os campos foram preenchidos
  if (!name || !email || !password) {
    return {
      message: "Preencha todos os campos",
      success: false
    };
  }

  //Verificar se o usuário já existe
  const user = await db.user.findUnique({
    where: { email }
  });

  if (user) {
    return {
      message: "Usuário já existe",
      success: false
    };
  }

  //Criar usuário caso nao exista
  await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password)
    }
  });

  return {
    message: "Usuário criado com sucesso",
    success: true
  };
}
