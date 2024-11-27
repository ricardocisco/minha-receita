import { ThemeToggle } from "@/components/ui/themeToggle";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col items-center justify-center font-sans">
      <div className="p-4 w-full flex justify-end">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
