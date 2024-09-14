import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { ITableState } from "@/interfaces";

interface IViewOptionsProps<TData> {
  table: Table<TData>;
}

const Index = <TData,>({ table }: IViewOptionsProps<TData>) => {

  // Load view options from localStorage on mount
  useEffect(() => {
    const tableId = (table.getState() as ITableState).id;
    const storedOptions = localStorage.getItem(`${tableId}_viewOption`);

    if (storedOptions) {
      const parsedOptions = JSON.parse(storedOptions);

      // Apply the saved visibility state to the columns
      table.getAllColumns().forEach((column) => {
        if (parsedOptions[column.id] !== undefined) {
          column.toggleVisibility(!!parsedOptions[column.id]);
        }
      });
    }
  }, [table]);

  // Function to handle changes in column visibility and save them to localStorage
  const handleColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    const tableId = (table.getState() as ITableState).id;
    const storedOptions = localStorage.getItem(`${tableId}_viewOption`);
    const parsedOptions = storedOptions ? JSON.parse(storedOptions) : {};

    // Update the visibility in localStorage
    parsedOptions[columnId] = isVisible;
    localStorage.setItem(`${tableId}_viewOption`, JSON.stringify(parsedOptions));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(value);
                  handleColumnVisibilityChange(column.id, value); // Save visibility change to localStorage
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Index;
