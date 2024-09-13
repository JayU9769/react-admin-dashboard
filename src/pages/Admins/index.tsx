import React, { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/dataTable";
import { userColumns } from "@/pages/Users/columns.tsx";
import { IPaginationState, TRecord } from "@/interfaces";
import { defaultAPIResponse, defaultPagination } from "@/lib/constants.ts";
import { Link, Outlet } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { SortingState } from "@tanstack/react-table";
import { convertToQuery } from "@/lib/utils.ts";
import { useLazyGetAdminsQuery } from "@/store/admin/api";

const Index: React.FC = () => {
  const [queryString, setQueryString] = useState<TRecord>({});
  const [getAdmins, { data = defaultAPIResponse, isFetching }] =
    useLazyGetAdminsQuery();
  const columns = useMemo(() => userColumns, []);

  useEffect(() => {
    if (Object.keys(queryString).length > 1) {
      getAdmins(convertToQuery(queryString));
    }
  }, [getAdmins, queryString]);

  const handlePagination = (pagination: IPaginationState) => {
    setQueryString({
      ...queryString,
      perPage: pagination.pageSize,
      pageNumber: pagination.pageIndex,
    });
  };

  const handleSearch = (value: string) => {
    setQueryString({
      ...queryString,
      q: value,
    });
  };

  const handleSorting = (sorting: SortingState) => {
    const tempQuery: TRecord = {
      ...queryString,
    };
    if (sorting.length > 0) {
      tempQuery.sort = sorting[0].id;
      tempQuery.order = sorting[0].desc ? "DESC" : "ASC";
      tempQuery.perPage = defaultPagination.pageSize;
      tempQuery.pageNumber = defaultPagination.pageIndex;
    }
    setQueryString(tempQuery);
  };

  return (
    <>
      <DataTable
        id={"admins"}
        data={data}
        columns={columns}
        isLoading={isFetching}
        onPagination={handlePagination}
        onSearch={handleSearch}
        onSorting={handleSorting}
        toolbarChildren={
          <>
            <Link to="create" className={buttonVariants({ size: "sm" })}>
              Create
            </Link>
          </>
        }
      />
      <Outlet />
    </>
  );
};

export default Index;
