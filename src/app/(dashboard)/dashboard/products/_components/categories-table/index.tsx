import { CategoryTable } from "./table";

export async function CategoriesDataTable({
  className,
}: {
  className?: string;
}) {
  const categories = [
    { id: "cat_gaming_hardware_01", name: "Gaming", slug: "gaming" },
    { id: "cat_perifericos_01", name: "Periféricos", slug: "perifericos" },
    { id: "cat_acessorios_01", name: "Acessórios", slug: "acessorios" },
  ];

  return <CategoryTable className={className} data={categories} />;
}
