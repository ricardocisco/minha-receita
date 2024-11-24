import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Register from "../_actions/register";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex w-full h-full items-center justify-center px-4">
      <Card className="md:w-[400px] w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Registro</CardTitle>
          <CardDescription className="text-center">
            Crie uma conta gratuitamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={Register}>
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
              <Button>Criar nova conta</Button>
              <Link className="text-center" href="/login">
                Já tenho uma conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
