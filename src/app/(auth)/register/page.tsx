import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import RegisterForm from "./RegisterForm";

export default function page() {
  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Registro</CardTitle>
          <CardDescription className="text-center">
            Crie uma conta gratuitamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </>
  );
}
