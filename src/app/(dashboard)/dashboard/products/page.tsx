import { Suspense } from "react";
import { CategoriesDataTable } from "./_components/categories-table";
import { ProductsDataTable } from "./_components/products-table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductsPage() {
  return (
    <div className="gap-8 flex-col lg:flex">
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoriesDataTable />
      </Suspense>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsDataTable />
      </Suspense>
    </div>
  );
}
