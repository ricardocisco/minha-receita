import { ThemeToggle } from "@/components/ui/themeToggle";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col items-center justify-center font-sans">
      <div className="max-w-sm w-full flex justify-between items-center">
        <Link href="/">
          <Home />
        </Link>
        <ThemeToggle />
      </div>
      {children}
    </section>
  );
}
