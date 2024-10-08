import React, {useEffect, useState} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Pagination from "./Pagination.tsx";
import {IListAPIResponse, IPaginationState, ITableState, TRecord} from "@/interfaces";
import {defaultPagination} from "@/lib/constants.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";
import EmptyBox from "@/components/EmptyBox.tsx";

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: IListAPIResponse;
  onPagination: (pagination: IPaginationState) => void;
  onSearch?: (filter: string) => void;
  onSorting?: (sorting: SortingState) => void;
  toolbarChildren?: React.ReactNode;
  tableActions?: React.ReactNode;
  isLoading: boolean;
  id: string;
  onRowSelection?: (table: TRecord) => void;
  resetSelection?: number;
  onRefresh?: () => void;
}

const Index = <TData, TValue>(
  {
    columns,
    data,
    onPagination,
    onSearch,
    toolbarChildren,
    tableActions,
    onSorting,
    isLoading = true,
    id,
    onRowSelection,
    onRefresh,
    resetSelection,
  }: IProps<TData, TValue>
) => {

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] =
    useState<IPaginationState>(defaultPagination);

  const table = useReactTable({
    data: data.rows,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      id,
    } as ITableState,
    initialState: {
      pagination: pagination,
    },
    rowCount: data.count,
    autoResetPageIndex: false,
    enableRowSelection: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (row: any) => row.id,
  });

  useEffect(() => {
    // Debounce pagination change...
    const timeOut = setTimeout(() => onPagination(pagination), 300);
    return () => clearTimeout(timeOut);
  }, [pagination]);

  useEffect(() => {
    if (onSorting) onSorting(sorting);
  }, [sorting]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (onRowSelection) {
        onRowSelection(rowSelection);
      }
    }, 200);

    return () => clearTimeout(timeOut);
  }, [rowSelection]);


  useEffect(() => {
    if (resetSelection) {
      table.setRowSelection({})
    }
  }, [resetSelection]);


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DebouncingInput
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(value) => {
              if (onSearch) onSearch(value);
              setGlobalFilter(value);
            }}
            className="h-8 w-[150px] lg:w-[250px] bg-white"
          />
          {tableActions}
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              if (onRefresh) onRefresh();
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4"/>
            Reload
          </Button>
          <ViewOptions table={table}/>
        </div>
        {toolbarChildren}
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className={`bg-muted`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell
                    className={`w-full min-h-[360px] h-[calc(100%-45px)] bg-[#ffffff9c] absolute flex justify-center items-center z-10`}
                  >
                    <Card>
                      <CardContent
                        className={`p-3 flex justify-center items-center gap-2`}
                      >
                        <ReloadIcon className="h-6 w-6 animate-spin text-muted-foreground"/>
                        <h1 className="scroll-m-20 text-md font-bold text-muted-foreground">
                          Loading...
                        </h1>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              </>
            )}
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {!isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <EmptyBox />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table}/>
    </div>
  );
};

export default Index;
