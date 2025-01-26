import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { CircleUser } from "lucide-react";
import Logout from "@/app/(auth)/_actions/logout";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="w-full mx-auto p-4 flex items-center justify-between border-b fixed backdrop-blur-md z-50">
      <Link href="/" className="text-2xl">
        Foco no Futuro
      </Link>
      <div className="flex items-center gap-2">
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CircleUser /> {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <form action={Logout}>
                <Button className="w-full" variant={"ghost"}>
                  Sair
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
