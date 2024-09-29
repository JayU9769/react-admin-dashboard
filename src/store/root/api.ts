import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants.ts";
import { EAPITags } from "@/interfaces";
import { ISearchArgs, ISearchResponse } from "./types";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: [EAPITags.DROPDOWN_OPTIONS],
  endpoints: (builder) => ({
    getDropdownOptions: builder.query<ISearchResponse, ISearchArgs>({
      query: ({ type = "", keyword = "" }) => `search-list?type=${type}&q=${keyword}`,
      transformResponse: ({ data }) => data,
      providesTags: (_result, _error, arg) => [{ type: EAPITags.DROPDOWN_OPTIONS, id: arg.type }],
    }),
  }),
});

export const { useGetDropdownOptionsQuery } = rootApi;
