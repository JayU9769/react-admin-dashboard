import {Table} from "@tanstack/react-table"
import {Input} from "@/components/ui/input"
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";

interface IToolbarProps<TData> {
  table: Table<TData>
  filter: string,
  onFilter: (filter: string) => void
}

const Index = <TData, >(
  {
    table,
    filter,
    onFilter
  }: IToolbarProps<TData>
) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={filter ?? ''}
          onChange={event => onFilter(String(event.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <ViewOptions table={table}/>
    </div>
  )
}

export default Index;