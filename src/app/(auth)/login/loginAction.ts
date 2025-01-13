/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../../auth";
import { redirect } from "next/navigation";

export async function LoginAction(_prevState: any, formData: FormData) {
  const entries = Array.from(formData.entries());
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };
  try {
    await signIn("credentials", { email, password });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { message: "Usuário ou senha inválidos", success: false };
      }
      return { message: "Erro ao fazer login", success: false };
    }
  }
  redirect("/");
}
