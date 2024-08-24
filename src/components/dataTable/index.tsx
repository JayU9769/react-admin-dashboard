import {useEffect, useState} from "react"
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
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants.ts";

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onPagination: (pagination: IPaginationState) => void
}

const Index = <TData, TValue>(
  {
    columns,
    data,
    onPagination
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

  const [pagination, setPagination] = useState<IPaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX, //initial page index
    pageSize: DEFAULT_PAGE_SIZE, //default page size
  });

  useEffect(() => {
    // Debounce pagination change...
    const timeOut = setTimeout(() => onPagination(pagination), 300);
    return () => clearTimeout(timeOut);
  }, [onPagination, pagination])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    initialState: {
      pagination: {
        pageIndex: 2, //custom initial page index
        pageSize: 25, //custom default page size
      },
    },
    rowCount: 100,
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
        onFilter={value => setGlobalFilter(value)}
      />
      <div className="rounded-md border">
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
      </div>
      <Pagination table={table}/>
    </div>
  )
}

export default Index;