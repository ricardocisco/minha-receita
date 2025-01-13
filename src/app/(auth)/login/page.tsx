import React from "react";
import LoginForm from "./LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Entrar</CardTitle>
          <CardDescription className="text-center">
            Crie uma conta gratuitamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}
