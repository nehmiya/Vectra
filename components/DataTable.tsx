import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import React from "react";

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <div>
      <Table className={cn("custom-scrollbar", tableClassName)}>
        <TableHeader className={headerClassName}>
          <TableRow className={cn("hover:bg-transparent!", headerRowClassName)}>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5",
                  headerCellClassName,
                  column.headClassName,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowKey(row, rowIndex)}
              className={cn(
                "overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative",
                bodyRowClassName,
              )}
            >
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  className={cn("py-4 first:pl-5 last:pr-5", bodyCellClassName, column.cellClassName)}
                >
                  {column.cell(row, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
