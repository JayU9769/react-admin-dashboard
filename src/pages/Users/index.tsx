import React, {useEffect, useMemo, useState} from "react";
import {useLazyGetUsersQuery} from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import {userColumns} from "@/pages/Users/columns.tsx";
import {IPaginationState} from "@/interfaces";
import {defaultAPIResponse} from "@/lib/constants.ts";

const Index: React.FC = () => {
  const [queryString, setQueryString] = useState('')
  const [ getUsers, { data = {data: defaultAPIResponse}, isFetching, status } ] = useLazyGetUsersQuery();
  const columns = useMemo(() => userColumns, [])

  useEffect(() => {
    if (queryString) {
      getUsers(queryString)
    }
  }, [queryString]);

  useEffect(() => {
    console.log(data, isFetching, status)
  }, [data]);

  const handlePagination = (pagination: IPaginationState) => {
    setQueryString(`?perPage=${pagination.pageSize}&pageNumber=${pagination.pageIndex}`)
  }

  const handleSearch = (value: string) => {
    setQueryString((prevState) => `${prevState}&search=${value}`)
  }

  return <>
    Users List

    <DataTable
      data={data.data}
      columns={columns}
      onPagination={handlePagination}
      onSearch={handleSearch}
    />
  </>
}

export default Index;