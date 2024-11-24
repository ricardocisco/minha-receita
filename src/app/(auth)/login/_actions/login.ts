"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../../../auth";
import { redirect } from "next/navigation";

export async function Login(FormData: FormData) {
  const entries = Array.from(FormData.entries());
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        throw new Error(error.message);
      }
    }
  }

  redirect("/");
}
