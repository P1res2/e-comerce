import { ProductWithCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Package } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "images",
    header: () => <div className="text-left" />,
    cell: (row) => {
      const images = row.getValue() as string[];
      if (!images || images.length === 0) {
        return (
          <div className="bg-muted w-[50px] h-[50px] flex items-center justify-center rounded">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
        );
      }
      return (
        <Image src={images[0]} alt="Product Image" width={50} height={50} />
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: (row) => {
      return row.getValue();
    },
  },
  {
    accessorKey: "name",
    header: "Nome/Categoria",
    cell: ({ row }) => {
      const { category, name } = row.original;
      return (
        <div className="flex flex-col gap-0 justify-center items-start">
          <div className="font-medium">{name}</div>
          <div className="font-sm text-muted-foreground">
            {category.name || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="font-medium text-green-300">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  // {
  //   accessorKey: "category",
  //   header: "Categoria",
  //   cell: ({ row }) => {
  //     const { category } = row.original;
  //     return <div>{category.name || "-"}</div>;
  //   },
  // },
  {
    accessorKey: "isActive",
    header: "Ativo",
  },
  {
    id: "actions",
    header: () => <div className="text-right" />,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View product details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
