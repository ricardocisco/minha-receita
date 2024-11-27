import { ThemeToggle } from "@/components/ui/themeToggle";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col items-center justify-center font-sans">
      <div className="p-4 w-full flex justify-between items-center">
        <Link href="/">
          <Home />
        </Link>
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
