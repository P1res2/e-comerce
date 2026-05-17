import { Card } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function OverviewPage() {
  return (
    <SidebarInset>
      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>Total de vendas</Card>
          <Card>Pedidos</Card>
          <Card>Usuários</Card>
          <Card>Receita</Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <Card className="lg:col-span-2">Gráfico</Card>
          <Card>Últimos pedidos</Card>
        </div>
      </div>
    </SidebarInset>
  );
}
