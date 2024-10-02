import React, { useMemo, useState } from "react";
import { useGetUsersQuery, userApi } from "@/store/user/api.ts";
import DataTable from "@/components/dataTable";
import { tableColumn } from "./columns.tsx";
import { EAPITags, IPaginationState, TRecord } from "@/interfaces";
import { DEFAULT_PAGE_SIZE, defaultAPIResponse, defaultPagination } from "@/lib/constants.ts";
import { Link, Outlet } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { SortingState } from "@tanstack/react-table";
import { convertToQuery } from "@/lib/utils.ts";
import Action from "@/pages/Users/Action.tsx";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import usePermission from "@/hooks/usePermissions.tsx";

const Index: React.FC = () => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const [queryString, setQueryString] = useState<TRecord>({
    perPage: DEFAULT_PAGE_SIZE,
  });
  const { data = defaultAPIResponse, isFetching } = useGetUsersQuery(queryString ? convertToQuery(queryString) : "");
  const columns = useMemo(() => tableColumn, []);
  const [selectedRows, setSelectedRows] = useState<TRecord>({});
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const hasCreatePermission = usePermission("user-create");

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

  const handleResetTableSelection = () => {
    setSelectedRows({});
    setResetTrigger((prev) => prev + 1);
  };

  const handleRefresh = () => dispatch(userApi.util.invalidateTags([EAPITags.USER]));

  return (
    <>
      <DataTable
        id={"users"}
        data={data}
        columns={columns}
        isLoading={isFetching}
        onPagination={handlePagination}
        onSearch={handleSearch}
        onSorting={handleSorting}
        onRowSelection={(rows) => setSelectedRows(rows)}
        resetSelection={resetTrigger}
        onRefresh={handleRefresh}
        tableActions={
          <>
            <Action type={"bulk"} ids={Object.keys(selectedRows)} onDelete={handleResetTableSelection} onUpdateAction={handleResetTableSelection} />
          </>
        }
        toolbarChildren={
          hasCreatePermission && (
            <>
              <Link to="create" className={buttonVariants({ size: "sm" })}>
                <Plus size={18} />
                Create
              </Link>
            </>
          )
        }
      />
      <Outlet />
    </>
  );
};

export default Index;
