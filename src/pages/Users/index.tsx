import React, {useEffect} from "react";
import {useGetUsersQuery} from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import {columns} from "@/pages/Users/columns.tsx";

const Index: React.FC = () => {
  const { data = { users: [] }, isFetching,  } = useGetUsersQuery('?limit=100');

  useEffect(() => {
    console.log(data.users, isFetching)
  }, [data.users]);

  return <>
    Users List

    <DataTable data={data.users} columns={columns} />
  </>
}

export default Index;