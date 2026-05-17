"use client";

import { Category } from "@/types";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { useState } from "react";
import { CreateCategorySheet } from "./create-category-sheet";

interface CategoryTableProps {
  data: Category[];
  className?: string;
}

export function CategoryTable({ data, className }: CategoryTableProps) {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  function handleCreate() {
    setIsCreateSheetOpen(true);
  }

  return (
    <>
      <CreateCategorySheet
        isCreateSheetOpen={isCreateSheetOpen}
        setIsCreateSheetOpen={setIsCreateSheetOpen}
      />
      <DataTable
        className={className}
        title="Categorias"
        size="sm"
        createHandle={handleCreate}
        data={data}
        columns={columns}
      />
    </>
  );
}
