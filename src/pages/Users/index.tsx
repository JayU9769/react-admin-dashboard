import React, {useEffect, useMemo} from "react";
import {useGetUsersQuery} from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import {userColumns} from "@/pages/Users/columns.tsx";

const Index: React.FC = () => {
  const { data = { users: [] }, isFetching  } = useGetUsersQuery('?limit=100');
  const columns = useMemo(() => userColumns, [])
  useEffect(() => {
    console.log(data.users, isFetching)
  }, [data.users]);

  return <>
    Users List

    <DataTable data={data.users} columns={columns} />
  </>
}

export default Index;