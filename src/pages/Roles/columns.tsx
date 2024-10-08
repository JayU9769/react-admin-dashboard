import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import ColumnHeader from "@/components/dataTable/ColumnHeader.tsx";
import { CircleCheck, CircleX } from "lucide-react";
import Action from "./Action.tsx";
import { IRole } from "@/interfaces/role";

export const tableColumn: ColumnDef<IRole>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
    filterFn: "equalsString",
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "type",
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className={`capitalize flex gap-1 text-muted-foreground items-center`}>
          {status ? (
            <>
              <CircleCheck className={`text-green-600`} size={16} /> Active
            </>
          ) : (
            <>
              <CircleX className={`text-red-600`} size={16} /> Inactive
            </>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "action",
    header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <Action type={"single"} ids={[id]} row={row.original} />;
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: "includesString",
  },
];
