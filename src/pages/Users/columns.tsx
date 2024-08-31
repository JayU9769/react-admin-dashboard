import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import ColumnHeader from "@/components/dataTable/ColumnHeader.tsx";
import {IUser} from "@/interfaces";
import {CircleCheck, CircleX } from "lucide-react";
import Action from "@/pages/Users/Action.tsx";

export const userColumns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({column}) => (
      <ColumnHeader column={column} title="ID"/>
    ),
    cell: ({row}) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
    filterFn: 'equalsString',
  },
  {
    accessorKey: "name",
    header: ({column}) => (
      <ColumnHeader column={column} title="Name"/>
    ),
    cell: ({row}) => <div>{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: "email",
    header: ({column}) => (
      <ColumnHeader column={column} title="Last Name"/>
    ),
    cell: ({row}) => <div>{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: "status",
    header: ({column}) => (
      <ColumnHeader column={column} title="Status"/>
    ),
    cell: ({row}) => {
      const status = row.getValue("status") as string;
      return <div className={`capitalize flex gap-2 text-muted-foreground`}>
        {
          status === 'active'
            ? <CircleCheck className={`h-4 w-4 text-green-600`}/>
            :
            <CircleX className={`h-4 w-4 text-red-600`}/>
        }
        {status}
      </div>
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: "action",
    header: ({column}) => (
      <ColumnHeader column={column} title="Actions"/>
    ),
    cell: ({row}) => {
      const id = row.getValue("id") as string;
      return <Action type={'single'} ids={[id]} />
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: 'includesString',
  },
]