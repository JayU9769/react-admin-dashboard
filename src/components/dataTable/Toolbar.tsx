import React from "react";
import {Table} from "@tanstack/react-table"
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import {RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface IToolbarProps<TData> {
  table: Table<TData>
  filter: string,
  onFilter: (filter: string) => void,
  children?: React.ReactNode,
  onRefresh?: () => void
}

const Index = <TData, >(
  {
    table,
    filter,
    onFilter,
    children,
    onRefresh
  }: IToolbarProps<TData>
) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncingInput
          placeholder="Search..."
          value={filter ?? ''}
          onChange={value => onFilter(value)}
          className="h-8 w-[150px] lg:w-[250px] bg-white"
        />
        <Button variant={'outline'} size={'sm'} onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reload
        </Button>
        <ViewOptions table={table}/>
      </div>
      { children }
    </div>
  )
}

export default Index;