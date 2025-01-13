/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn } from "../../../../auth";

export async function LoginAction(__prevState: any, FormData: FormData) {
  try {
    await signIn("credentials", {
      email: FormData.get("email") as string,
      password: FormData.get("password") as string,
      redirect: true,
      redirectTo: "/"
    });
    return { success: true };
  } catch (error: any) {
    if ((error.type = "CredentialsSignin")) {
      return {
        message: "Email ou senha incorretos",
        success: false
      };
    }

    return {
      message: "Erro ao fazer login",
      success: false
    };
  }
}
