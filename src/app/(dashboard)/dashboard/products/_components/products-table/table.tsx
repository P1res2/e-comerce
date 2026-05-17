"use client";

import { ProductWithCategory } from "@/types";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { CreateProductSheet } from "./create-product-sheet";
import { useState } from "react";

interface ProductsDataTableProps {
  data: ProductWithCategory[];
  className?: string;
}

export function ProductsTable({ data, className }: ProductsDataTableProps) {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  function handleCreate() {
    setIsCreateSheetOpen(true);
  }

  return (
    <>
      <CreateProductSheet
        isCreateSheetOpen={isCreateSheetOpen}
        setIsCreateSheetOpen={setIsCreateSheetOpen}
      />
      <DataTable
        className={className}
        title="Produtos"
        size="lg"
        createHandle={handleCreate}
        data={data}
        columns={columns}
      />
    </>
  );
}
