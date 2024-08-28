import React from "react";
import {Table} from "@tanstack/react-table"
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import {ListCollapse, RefreshCw, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

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
        {table.getSelectedRowModel().rows.length > 0 &&
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={`sm`} className={`gap-2`}>
                <ListCollapse className={`h-4 w-4`}/>
                Actions
                <span className={`font-bold`}>( {table.getSelectedRowModel().rows.length} )</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Delete
                  <DropdownMenuShortcut><Trash2 className={`h-4 w-4`}/></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Active</DropdownMenuItem>
                      <DropdownMenuItem>In-Active</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        <Button variant={'outline'} size={'sm'} onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4"/>
          Reload
        </Button>
        <ViewOptions table={table}/>
      </div>
      {children}
    </div>
  )
}

export default Index;