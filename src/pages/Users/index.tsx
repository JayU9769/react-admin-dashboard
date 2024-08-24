import React, {useEffect, useMemo, useState} from "react";
import {useLazyGetUsersQuery} from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import {userColumns} from "@/pages/Users/columns.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IPaginationState} from "@/interfaces";

const Index: React.FC = () => {
  const [query, setQuery] = useState('?limit=10')
  const [ getUsers, { data = {users: []}, isFetching, status } ] = useLazyGetUsersQuery();
  const columns = useMemo(() => userColumns, [])

  useEffect(() => {
    getUsers(query)
  }, []);

  useEffect(() => {
    console.log(data.users, isFetching, status)
  }, [data]);

  const handlePagination = (pagination: IPaginationState) => {
    console.log(pagination);
    // setQuery(query + '&skip=20')
  }

  return <>
    Users List
    <Button onClick={() => {
      setQuery('?limit=20')
    }}>Reload</Button>

    <DataTable
      data={data.users}
      columns={columns}
      onPagination={handlePagination}
    />
  </>
}

export default Index;