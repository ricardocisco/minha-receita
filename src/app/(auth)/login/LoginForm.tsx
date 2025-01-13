"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginAction } from "./loginAction";
import Form from "next/form";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(LoginAction, null);

  return (
    <>
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col mb-4">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div className="py-2">
          <Label className="text-lg">E-mail</Label>
          <Input
            name="email"
            type="email"
            placeholder="example@gmail.com"
          ></Input>
        </div>
        <div className="py-2">
          <Label className="text-lg">Senha</Label>
          <Input
            name="password"
            type="password"
            placeholder="sua senha"
          ></Input>
        </div>
        <div className="flex flex-col py-4 gap-4">
          <Button disabled={isPending}>Login</Button>
          <div className="flex justify-between">
            <Link className="text-sm" href="/">
              Esqueci a senha
            </Link>
            <Link className="text-sm" href="/register">
              Criar uma nova conta
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
}
