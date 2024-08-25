import React, {useEffect, useMemo} from "react";
import {useLazyGetUsersQuery} from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import {userColumns} from "@/pages/Users/columns.tsx";
import {IPaginationState} from "@/interfaces";

const Index: React.FC = () => {
  const [ getUsers, { data = {users: []}, isFetching, status } ] = useLazyGetUsersQuery();
  const columns = useMemo(() => userColumns, [])

  useEffect(() => {
    // getUsers(query)
  }, []);

  useEffect(() => {
    console.log(data.users, isFetching, status)
  }, [data]);

  const handlePagination = (pagination: IPaginationState) => {
    const skip = pagination.pageSize * pagination.pageIndex;
    console.log(pagination, "skip ===", pagination.pageSize * pagination.pageIndex);
    getUsers(`?limit=${pagination.pageSize}&skip=${skip}`)
    // setQuery(query + '&skip=20')
  }

  return <>
    Users List

    <DataTable
      data={data.users}
      columns={columns}
      onPagination={handlePagination}
    />
  </>
}

export default Index;