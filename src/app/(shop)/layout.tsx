import { AppHeader } from "@/components/layout/header";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <AppHeader />
      <div className="my-16 mx-auto">{children}</div>
    </div>
  );
}
