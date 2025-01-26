"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegisterAction from "./registerAction";
import Form from "next/form";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(RegisterAction, null);

  return (
    <>
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col mb-4">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      {state?.success === true && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex flex-col mb-4">
          <strong className="font-bold">Sucesso!</strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div className="py-2">
          <Label className="text-lg">Nome</Label>
          <Input name="name" type="text" placeholder="John Doe"></Input>
        </div>
        <div className="py-2">
          <Label className="text-lg">E-mail</Label>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
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
          <Button disabled={isPending}>Criar nova conta</Button>
          <Link className="text-center" href="/login">
            Já tenho uma conta
          </Link>
        </div>
      </Form>
    </>
  );
}
