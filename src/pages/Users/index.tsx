import React, { useEffect, useMemo, useState } from "react";
import { useLazyGetUsersQuery } from "@/store/root/api.ts";
import DataTable from "@/components/dataTable";
import { userColumns } from "@/pages/Users/columns.tsx";
import {IPaginationState, TRecord} from "@/interfaces";
import { defaultAPIResponse } from "@/lib/constants.ts";
import { Link, Outlet } from "react-router-dom";
import {buttonVariants} from "@/components/ui/button";
import {SortingState} from "@tanstack/react-table";
import {convertToQuery} from "@/lib/utils.ts";

const Index: React.FC = () => {
  const [queryString, setQueryString] = useState<TRecord>({});
  const [
    getUsers,
    { data = { data: defaultAPIResponse }, isFetching },
  ] = useLazyGetUsersQuery();
  const columns = useMemo(() => userColumns, []);

  useEffect(() => {
    console.log(Object.keys(queryString).length, queryString)
    if (Object.keys(queryString).length > 1) {
      getUsers(convertToQuery(queryString));
    }
  }, [queryString]);

  const handlePagination = (pagination: IPaginationState) => {
    setQueryString({
      ...queryString,
      perPage:pagination.pageSize,
      pageNumber: pagination.pageIndex
    });
  };

  const handleSearch = (value: string) => {
    setQueryString({
      ...queryString,
      q: value
    });
  };

  const handleSorting = (sorting: SortingState) => {
    const tempQuery: TRecord = {
      ...queryString
    };
    if (sorting.length > 0) {
      tempQuery.sort = sorting[0].id;
      tempQuery.order = sorting[0].desc ? 'DESC' : 'ASC';
    }
    setQueryString(tempQuery);
  }

  return (
    <>
      <div className="flex justify-between">
        <h4>Users List</h4>
      </div>
      <DataTable
        data={data.data}
        columns={columns}
        isLoading={isFetching}
        onPagination={handlePagination}
        onSearch={handleSearch}
        onSorting={handleSorting}
        toolbarChildren={<>
          <Link to="create" className={buttonVariants({size: "sm"})}>
            Create
          </Link>
        </>}
      />
      <Outlet/>
    </>
  );
};

export default Index;