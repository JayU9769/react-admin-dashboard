import {Table} from "@tanstack/react-table"
import ViewOptions from "@/components/dataTable/ViewOptions.tsx";
import DebouncingInput from "@/components/DebouncingInput.tsx";

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
        <DebouncingInput
          placeholder="Search..."
          value={filter ?? ''}
          onChange={value => onFilter(value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

      </div>
      <ViewOptions table={table}/>
    </div>
  )
}

export default Index;