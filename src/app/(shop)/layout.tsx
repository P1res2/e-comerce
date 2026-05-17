import { AppHeader } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="min-h-full flex flex-col">
      <AppHeader />
      <div className="my-16 mx-auto w-full max-w-full md:max-w-7xl px-8">{children}</div>
      {session?.user.role === "ADMIN" && (
        <Link href="/dashboard" aria-label="Ir para o Dashboard">
          <Button
            className="fixed z-50 left-8 bottom-8 group"
            size="icon"
            variant="default"
          >
            <LayoutDashboard className="size-5 transition-transform duration-200 group-hover:scale-[1.20]" />
            <span className="sr-only">Dashboard</span>
          </Button>
        </Link>
      )}
    </div>
  );
}