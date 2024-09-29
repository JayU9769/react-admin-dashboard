import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import { EAPITags } from "@/interfaces";
import { ISearchArgs, ISearchItem, ISearchValueArgs } from "./types";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: [EAPITags.DROPDOWN_OPTIONS],
  endpoints: (builder) => ({
    getDropdownOptions: builder.query<Array<ISearchItem>, ISearchArgs>({
      query: ({ type = "", keyword = "" }) => `search-list?type=${type}&q=${keyword}`,
      transformResponse: ({ data }) => data,
      providesTags: (data: any) => (data ? data.map(({ value }: ISearchItem) => ({ type: EAPITags.DROPDOWN_OPTIONS, id: value })) : [EAPITags.DROPDOWN_OPTIONS]),
    }),
    getDropdownValue: builder.query<ISearchItem, ISearchValueArgs>({
      query: ({ type = "", value = "" }) => `search-value?type=${type}&value=${value}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, arg) => [{ type: EAPITags.DROPDOWN_OPTIONS, id: arg.value }],
    }),
  }),
});

export const { useGetDropdownOptionsQuery, useGetDropdownValueQuery } = rootApi;
