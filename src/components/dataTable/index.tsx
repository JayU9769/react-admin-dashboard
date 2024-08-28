import React, {useEffect, useState} from "react"
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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Pagination from "./Pagination.tsx"
import Toolbar from "./Toolbar.tsx";
import {IPaginationState} from "@/interfaces";
import {defaultPagination} from "@/lib/constants.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ReloadIcon} from "@radix-ui/react-icons";

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: {
    count: number;
    rows: TData[]
  },
  onPagination: (pagination: IPaginationState) => void,
  onSearch?: (filter: string) => void,
  onSorting?: (sorting: SortingState) => void,
  toolbarChildren?: React.ReactNode,
  isLoading: boolean
}

const Index = <TData, TValue>(
  {
    columns,
    data,
    onPagination,
    onSearch,
    toolbarChildren,
    onSorting,
    isLoading = true
  }: IProps<TData, TValue>
) => {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState<IPaginationState>(defaultPagination);

  useEffect(() => {
    // Debounce pagination change...
    const timeOut = setTimeout(() => onPagination(pagination), 300);
    return () => clearTimeout(timeOut);
  }, [pagination])


  useEffect(() => {
    if (onSorting) onSorting(sorting)
  }, [sorting]);

  const table = useReactTable({
    data: data.rows,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
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
  })

  return (
    <div className="space-y-4">
      <Toolbar
        table={table}
        filter={globalFilter}
        children={toolbarChildren}
        onRefresh={() => onPagination(pagination)}
        onFilter={value => {
          if (onSearch) onSearch(value)
          setGlobalFilter(value)
        }}
      />
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            { isLoading && <>
              <TableRow>
                <TableCell className={`w-full min-h-[360px] h-[calc(100%-45px)] bg-[#ffffff9c] absolute flex justify-center items-center z-10`}>
                  <Card>
                    <CardContent className={`p-3 flex justify-center items-center gap-2`}>
                      <ReloadIcon className="h-6 w-6 animate-spin text-muted-foreground" />
                      <h1 className="scroll-m-20 text-md font-bold text-muted-foreground">
                        Loading...
                      </h1>
                    </CardContent>
                  </Card>
                </TableCell>

              </TableRow>
            </>}
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
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                { !isLoading && <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow> }
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table}/>
    </div>
  )
}

export default Index;