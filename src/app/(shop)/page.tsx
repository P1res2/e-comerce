import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const products = [
    { title: "T-Shirt", price: 99.99 },
    { title: "Boné", price: 59.99 },
    { title: "Tênis", price: 339.99 },
    { title: "Calça", price: 129.99 },
    { title: "Meias", price: 19.99 },
    { title: "Cueca", price: 29.99 },
    { title: "Shirt", price: 59.99 },
    { title: "Bolsa", price: 39.99 },
  ];

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => {
        return (
          <Card key={item.title} className="p-4 flex flex-col gap-2 max-w-[280px]">
            <div className="w-[250px] h-[250px] bg-gray-400 transition animate-pulse" />
            <span>{item.title}</span>
            <span>R${item.price.toString().replace(".", ",")}</span>
            <Button variant="secondary">Adicionar ao carrinho</Button>
            <Button variant="default">Comprar</Button>
          </Card>
        );
      })}
    </main>
  );
}
