import {Table} from "@tanstack/react-table"
import {Input} from "@/components/ui/input"
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";

interface IToolbarProps<TData> {
  table: Table<TData>
}

const Index = <TData, >(
  {
    table,
  }: IToolbarProps<TData>
) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <ViewOptions table={table}/>
    </div>
  )
}

export default Index;