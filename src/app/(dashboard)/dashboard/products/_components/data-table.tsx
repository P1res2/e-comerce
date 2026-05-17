"use client";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<T> {
  className?: string;
  title?: string;
  data: T[];
  columns: ColumnDef<T>[];
  createHandle: () => void;
  size?: "sm" | "md" | "lg";
}

export function DataTable<T>({
  className,
  title = "",
  data,
  columns,
  createHandle,
  size = "md",
}: DataTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className={cn(className, "pb-0 mb-0")}>
      <CardHeader className="border-b flex flex-col items-center justify-between gap-2 md:flex-row">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-row gap-6">
          <InputGroup className="w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Button variant="outline" size="icon" onClick={createHandle}>
            <Plus />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden p-0 flex flex-col">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <ScrollArea
          className={cn(
            size === "sm" && "h-[219px]",
            size === "md" && "h-[341px]",
            size === "lg" && "h-[599px]",
          )}
        >
          <Table>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
